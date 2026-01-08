const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data/db');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JsonDb {
    constructor(collectionName) {
        this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
        this.data = [];
        this.load();
    }

    load() {
        if (fs.existsSync(this.filePath)) {
            const content = fs.readFileSync(this.filePath, 'utf-8');
            this.data = JSON.parse(content || '[]');
        } else {
            this.save();
        }
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }

    async find(query = {}) {
        return this.data.filter(item => {
            for (let key in query) {
                if (query[key] instanceof RegExp) {
                    if (!query[key].test(item[key])) return false;
                } else if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    async findOne(query = {}) {
        const results = await this.find(query);
        return results[0] || null;
    }

    async findById(id) {
        return this.data.find(item => item._id === id || item.id === id);
    }

    async create(doc) {
        const newDoc = {
            ...doc,
            _id: doc._id || Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.data.push(newDoc);
        this.save();
        return newDoc;
    }

    async findByIdAndUpdate(id, update) {
        const index = this.data.findIndex(item => item._id === id || item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...update, updatedAt: new Date().toISOString() };
            this.save();
            return this.data[index];
        }
        return null;
    }

    async findByIdAndDelete(id) {
        const index = this.data.findIndex(item => item._id === id || item.id === id);
        if (index !== -1) {
            const deleted = this.data.splice(index, 1);
            this.save();
            return deleted[0];
        }
        return null;
    }

    async distinct(field) {
        return [...new Set(this.data.map(item => item[field]))];
    }
}

const usersDb = new JsonDb('users');
const productsDb = new JsonDb('products');
const ordersDb = new JsonDb('orders');
const settingsDb = new JsonDb('settings');
const newsletterDb = new JsonDb('newsletter');

module.exports = { usersDb, productsDb, ordersDb, settingsDb, newsletterDb };
