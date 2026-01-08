const generateInvoiceHtml = (order) => {
    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #555;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f6f6f6;
            }
            .container {
                max-width: 800px;
                margin: 20px auto;
                background: #ffffff;
                padding: 40px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
            .header {
                display: table;
                width: 100%;
                margin-bottom: 40px;
                border-bottom: 2px solid #eee;
                padding-bottom: 20px;
            }
            .logo-section {
                display: table-cell;
                vertical-align: middle;
            }
            .invoice-details {
                display: table-cell;
                text-align: right;
                vertical-align: middle;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #2C524F; /* Brand Primary */
                text-transform: uppercase;
                letter-spacing: 2px;
                text-decoration: none;
            }
            .invoice-title {
                font-size: 24px;
                color: #333;
                font-weight: 300;
                text-transform: uppercase;
                margin: 0;
            }
            .invoice-meta {
                margin-top: 5px;
                font-size: 14px;
                color: #777;
            }
            .addresses {
                display: table;
                width: 100%;
                margin-bottom: 40px;
            }
            .address-col {
                display: table-cell;
                width: 50%;
                vertical-align: top;
            }
            .address-title {
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                color: #999;
                margin-bottom: 10px;
            }
            .address-content {
                font-size: 14px;
                color: #333;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 40px;
            }
            .items-table th {
                text-align: left;
                padding: 12px;
                background-color: #f8f8f8;
                color: #555;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 12px;
                border-bottom: 2px solid #ddd;
            }
            .items-table td {
                padding: 12px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
            }
            .items-table .text-right {
                text-align: right;
            }
            .totals {
                width: 100%;
                margin-bottom: 40px;
            }
            .totals-table {
                width: 40%;
                margin-left: auto;
                border-collapse: collapse;
            }
            .totals-table td {
                padding: 8px 12px;
                text-align: right;
            }
            .totals-table .label {
                color: #777;
                font-size: 14px;
            }
            .totals-table .value {
                color: #333;
                font-size: 15px;
                font-weight: 500;
            }
            .totals-table .grand-total .label {
                font-weight: bold;
                color: #333;
                border-top: 2px solid #333;
                padding-top: 15px;
            }
            .totals-table .grand-total .value {
                font-weight: bold;
                font-size: 20px;
                color: #2C524F;
                border-top: 2px solid #333;
                padding-top: 15px;
            }
            .footer {
                text-align: center;
                border-top: 1px solid #eee;
                padding-top: 30px;
                color: #999;
                font-size: 13px;
            }
            .footer a {
                color: #2C524F;
                text-decoration: none;
            }
            .status-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 4px;
                font-size: 12px;
                background-color: #e0f2f1;
                color: #00695c;
                margin-top: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="logo-section">
                    <span class="logo">Zaylo</span>
                </div>
                <div class="invoice-details">
                    <h1 class="invoice-title">Invoice</h1>
                    <div class="invoice-meta">#${order._id.substring(0, 8).toUpperCase()}</div>
                    <div class="invoice-meta">${formatDate(order.createdAt || new Date())}</div>
                </div>
            </div>

            <!-- Addresses -->
            <div class="addresses">
                <div class="address-col">
                    <div class="address-title">Billed To</div>
                    <div class="address-content">
                        <strong>${order.user?.name || 'Customer'}</strong><br>
                        ${order.user?.email || ''}<br>
                        ${order.paymentMethod} Payment
                    </div>
                </div>
                <div class="address-col" style="text-align: right;">
                    <div class="address-title">Shipped To</div>
                    <div class="address-content">
                        <strong>${order.shippingAddress.address}</strong><br>
                        ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                        ${order.shippingAddress.country}
                    </div>
                </div>
            </div>

            <!-- Items -->
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Item Description</th>
                        <th class="text-right">Price</th>
                        <th class="text-right">Qty</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.orderItems.map(item => `
                        <tr>
                            <td>
                                <strong>${item.name}</strong>
                            </td>
                            <td class="text-right">${formatCurrency(item.price)}</td>
                            <td class="text-right">${item.qty}</td>
                            <td class="text-right"><strong>${formatCurrency(item.price * item.qty)}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <!-- Totals -->
            <div class="totals">
                <table class="totals-table">
                    <tr>
                        <td class="label">Subtotal</td>
                        <td class="value">${formatCurrency(order.itemsPrice)}</td>
                    </tr>
                    <tr>
                        <td class="label">Shipping</td>
                        <td class="value">${formatCurrency(order.shippingPrice)}</td>
                    </tr>
                    <tr>
                        <td class="label">Tax (15%)</td>
                        <td class="value">${formatCurrency(order.taxPrice)}</td>
                    </tr>
                    <tr class="grand-total">
                        <td class="label">Total</td>
                        <td class="value">${formatCurrency(order.totalPrice)}</td>
                    </tr>
                </table>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Thank you for your business!</p>
                <p>If you have any questions about this invoice, please contact <a href="mailto:support@zaylo.com">support@zaylo.com</a></p>
                <p>&copy; ${new Date().getFullYear()} Zaylo Inc.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = generateInvoiceHtml;
