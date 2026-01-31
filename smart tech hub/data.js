const DB_KEYS = {
    PRODUCTS: 'sth_products',
    CART: 'sth_cart',
    WISHLIST: 'sth_wishlist',
    ORDERS: 'sth_orders',
    SALES: 'sth_sales'
};

const CATEGORIES = [
    { id: 'all', name: 'All Components', icon: 'fa-microchip' },
    { id: 'ram', name: 'RAM Memory', icon: 'fa-memory' },
    { id: 'internal-storage', name: 'Storage (SSD/HDD)', icon: 'fa-hdd' },
    { id: 'gpu', name: 'Graphics Cards', icon: 'fa-gamepad' },
    { id: 'motherboard', name: 'Motherboards', icon: 'fa-server' },
    { id: 'cpu-intel', name: 'Processors (Intel)', icon: 'fa-microchip' },
    { id: 'cpu-amd', name: 'Processors (AMD)', icon: 'fa-microchip' },
    { id: 'smps', name: 'Power Supply', icon: 'fa-plug' },
    { id: 'case', name: 'Cabinets', icon: 'fa-desktop' },
    { id: 'monitor', name: 'Monitors', icon: 'fa-tv' },
    { id: 'cooler', name: 'CPU Coolers', icon: 'fa-fan' },
    { id: 'peripheral', name: 'Peripherals', icon: 'fa-keyboard' },
    { id: 'networking', name: 'Networking', icon: 'fa-wifi' }
];

const getImg = (keywords) => `https://loremflickr.com/320/320/${keywords}?lock=${Math.floor(Math.random() * 10000)}`;

const INITIAL_PRODUCTS = [
    // RAM
    { id: 'ram-001', name: 'Corsair Vengeance RGB Pro 16GB DDR4 3200MHz', category: 'ram', price: 4500, stock: 50, image: getImg('ram,computer'), description: 'High performance RGB memory.' },
    { id: 'ram-002', name: 'G.SKILL Trident Z5 RGB 32GB DDR5 6000MHz', category: 'ram', price: 12500, stock: 25, image: getImg('ram,memory'), description: 'Next-gen DDR5 performance.' },
    { id: 'ram-003', name: 'Kingston Fury Beast 8GB DDR4 3200MHz', category: 'ram', price: 2100, stock: 100, image: getImg('ram,pc'), description: 'Reliable performance for any build.' },
    { id: 'ram-004', name: 'Adata XPG Spectrix D60G 16GB DDR4 RGB', category: 'ram', price: 4800, stock: 30, image: getImg('ram,rgb'), description: 'Diamond-cut design.' },
    { id: 'ram-005', name: 'Crucial RAM 16GB DDR4 3200MHz CL22', category: 'ram', price: 3500, stock: 45, image: getImg('ram'), description: 'Standard reliable desktop RAM.' },
    { id: 'ram-006', name: 'TeamGroup T-Force Delta RGB 32GB DDR5', category: 'ram', price: 11000, stock: 15, image: getImg('ram,ddr5'), description: 'Ultra-fast gaming memory.' },

    // Storage
    { id: 'ssd-001', name: 'Samsung 980 PRO 1TB NVMe Gen4 SSD', category: 'internal-storage', price: 8999, stock: 30, image: getImg('ssd,samsung'), description: 'Blazing fast Gen4 NVMe.' },
    { id: 'hdd-001', name: 'Seagate Barracuda 2TB 7200RPM HDD', category: 'internal-storage', price: 4200, stock: 60, image: getImg('harddrive'), description: 'Reliable high-capacity storage.' },
    { id: 'ssd-002', name: 'WD Black SN850X 2TB NVMe SSD', category: 'internal-storage', price: 15500, stock: 15, image: getImg('ssd,gaming'), description: 'Top-tier gaming storage.' },
    { id: 'ssd-003', name: 'Crucial P3 500GB NVMe SSD', category: 'internal-storage', price: 3200, stock: 80, image: getImg('ssd'), description: 'Budget friendly NVMe speed.' },
    { id: 'hdd-002', name: 'WD Blue 4TB Desktop HDD', category: 'internal-storage', price: 8500, stock: 20, image: getImg('harddisk'), description: 'Massive storage for creators.' },
    { id: 'ssd-004', name: 'Kingston NV2 2TB NVMe Gen4', category: 'internal-storage', price: 9500, stock: 25, image: getImg('ssd,pcie'), description: 'Gen4 speed at Gen3 prices.' },
    { id: 'ssd-005', name: 'Samsung 870 EVO 1TB SATA SSD', category: 'internal-storage', price: 7200, stock: 40, image: getImg('ssd,sata'), description: 'The industry standard SATA SSD.' },

    // GPU
    { id: 'gpu-001', name: 'ASUS ROG Strix GeForce RTX 4070 Ti 12GB', category: 'gpu', price: 82000, stock: 8, image: getImg('graphicscard,nvidia'), description: 'Ultimate cooling and performance.' },
    { id: 'gpu-002', name: 'Sapphire PULSE AMD Radeon RX 7800 XT 16GB', category: 'gpu', price: 54000, stock: 12, image: getImg('graphicscard,amd'), description: '1440p gaming leader.' },
    { id: 'gpu-003', name: 'Zotac Gaming GeForce RTX 3060 12GB', category: 'gpu', price: 25500, stock: 40, image: getImg('gpu'), description: 'Best value for ray tracing.' },
    { id: 'gpu-004', name: 'Gigabyte GeForce RTX 4090 Gaming OC 24GB', category: 'gpu', price: 175000, stock: 3, image: getImg('rtx4090'), description: 'The most powerful GPU ever.' },
    { id: 'gpu-005', name: 'MSI Radeon RX 6600 Mech 2X 8GB', category: 'gpu', price: 19999, stock: 25, image: getImg('radeon'), description: 'Great 1080p efficiency.' },
    { id: 'gpu-006', name: 'EVGA GeForce RTX 3080 FTW3 Ultra 10GB', category: 'gpu', price: 65000, stock: 5, image: getImg('rtx3080'), description: 'Iconic cooling design.' },
    { id: 'gpu-007', name: 'PowerColor Hellhound Radeon RX 7900 XTX', category: 'gpu', price: 92000, stock: 7, image: getImg('rx7900xtx'), description: 'AMD flagship performance.' },

    // CPU Intel
    { id: 'cpu-001', name: 'Intel Core i5-13600K 13th Gen', category: 'cpu-intel', price: 28500, stock: 20, image: getImg('intel,cpu'), description: 'King of mid-range gaming.' },
    { id: 'cpu-003', name: 'Intel Core i9-14900K 14th Gen', category: 'cpu-intel', price: 55000, stock: 10, image: getImg('processor,intel'), description: 'Peak multi-core power.' },
    { id: 'cpu-004', name: 'Intel Core i3-12100F 12th Gen', category: 'cpu-intel', price: 8500, stock: 50, image: getImg('cpu'), description: 'Best quad-core CPU.' },
    { id: 'cpu-007', name: 'Intel Core i7-14700K 14th Gen', category: 'cpu-intel', price: 42000, stock: 18, image: getImg('i7,processor'), description: 'Extra E-cores for creators.' },
    { id: 'cpu-008', name: 'Intel Core i5-12400F 12th Gen', category: 'cpu-intel', price: 13500, stock: 35, image: getImg('i5'), description: 'The value champion.' },

    // CPU AMD
    { id: 'cpu-002', name: 'AMD Ryzen 7 7800X3D Gaming Processor', category: 'cpu-amd', price: 36000, stock: 15, image: getImg('amd,ryzen'), description: 'Fastest gaming CPU available.' },
    { id: 'cpu-005', name: 'AMD Ryzen 5 7600X', category: 'cpu-amd', price: 21500, stock: 30, image: getImg('ryzen'), description: 'Strong entry into AM5.' },
    { id: 'cpu-006', name: 'AMD Ryzen 9 7950X3D', category: 'cpu-amd', price: 62000, stock: 5, image: getImg('processor'), description: 'Unmatched mixed performance.' },
    { id: 'cpu-009', name: 'AMD Ryzen 5 5600X', category: 'cpu-amd', price: 14500, stock: 60, image: getImg('ryzen5'), description: 'Still great for budget builds.' },
    { id: 'cpu-010', name: 'AMD Ryzen 7 5700X', category: 'cpu-amd', price: 18000, stock: 25, image: getImg('ryzen7'), description: 'Efficient 8-core power.' },

    // Motherboards
    { id: 'mobo-001', name: 'MSI MAG B760 Tomahawk WiFi DDR4', category: 'motherboard', price: 18500, stock: 18, image: getImg('motherboard'), description: 'Solid B760 platform.' },
    { id: 'mobo-002', name: 'ASUS ROG Crosshair X670E Hero', category: 'motherboard', price: 65000, stock: 4, image: getImg('motherboard,asus'), description: 'Premium AM5 features.' },
    { id: 'mobo-003', name: 'Gigabyte B650 Gaming X AX', category: 'motherboard', price: 16500, stock: 22, image: getImg('motherboard,gigabyte'), description: 'Everything you need for B650.' },
    { id: 'mobo-004', name: 'ASRock Z790 Steel Legend WiFi', category: 'motherboard', price: 23500, stock: 10, image: getImg('motherboard,asrock'), description: 'Stunning white design.' },
    { id: 'mobo-005', name: 'MSI PRO Z790-P WIFI DDR4', category: 'motherboard', price: 20500, stock: 15, image: getImg('motherboard,msi'), description: 'High-speed professional board.' },

    // SMPS
    { id: 'smps-001', name: 'Deepcool PM750D 750W 80+ Gold', category: 'smps', price: 6500, stock: 40, image: getImg('powersupply'), description: 'Reliable Gold performance.' },
    { id: 'smps-002', name: 'Corsair RM850e 850W Fully Modular', category: 'smps', price: 10500, stock: 20, image: getImg('corsair'), description: 'Modern ATX 3.0 ready.' },
    { id: 'smps-003', name: 'EVGA SuperNOVA 1000 G6 1000W', category: 'smps', price: 16500, stock: 8, image: getImg('psu'), description: 'High wattage for big GPUs.' },
    { id: 'smps-004', name: 'Cooler Master MWE 550 Bronze V2', category: 'smps', price: 3800, stock: 50, image: getImg('smps'), description: 'Perfect for entry builds.' },

    // Coolers
    { id: 'cool-001', name: 'DeepCool AK620 Digital CPU Air Cooler', category: 'cooler', price: 5800, stock: 25, image: getImg('cpucooler,fan'), description: 'Air cooler with temp display.' },
    { id: 'cool-002', name: 'NZXT Kraken 360 RGB AIO Cooler', category: 'cooler', price: 17500, stock: 12, image: getImg('liquidcooler'), description: 'Stunning RGB liquid cooling.' },
    { id: 'cool-003', name: 'Noctua NH-D15 chromax.black', category: 'cooler', price: 9500, stock: 15, image: getImg('noctua'), description: 'The legend of air cooling.' },
    { id: 'cool-004', name: 'Arctic Liquid Freezer II 240', category: 'cooler', price: 8200, stock: 20, image: getImg('aio,cooler'), description: 'Top tier cooling performance.' },
    { id: 'cool-005', name: 'Cooler Master Hyper 212 RGB Black', category: 'cooler', price: 3200, stock: 40, image: getImg('cooler,rgb'), description: 'The classic refined.' },

    // Cabinets
    { id: 'case-001', name: 'Lian Li PC-O11 Dynamic EVO', category: 'case', price: 14500, stock: 10, image: getImg('pccase,lianli'), description: 'The ultimate builder case.' },
    { id: 'case-002', name: 'NZXT H5 Flow Compact Tower', category: 'case', price: 8500, stock: 20, image: getImg('pc,case'), description: 'Excellent airflow and design.' },
    { id: 'case-003', name: 'Corsair 4000D Airflow Tempered Glass', category: 'case', price: 7800, stock: 30, image: getImg('case,corsair'), description: 'Clean lines, great thermals.' },
    { id: 'case-004', name: 'Fractal Design North Charcoal Black', category: 'case', price: 13000, stock: 5, image: getImg('case,fractal'), description: 'Wood front panel aesthetic.' },

    // Monitors
    { id: 'mon-001', name: 'LG Ultragear 27GN800 27" 1440p 144Hz', category: 'monitor', price: 23000, stock: 15, image: getImg('monitor,gaming'), description: 'Crisp QHD IPS display.' },
    { id: 'mon-002', name: 'Samsung Odyssey G7 32" 240Hz', category: 'monitor', price: 45000, stock: 8, image: getImg('monitor,curved'), description: 'Ultimate curved immersion.' },
    { id: 'mon-003', name: 'Gigabyte M27Q 27" 170Hz KVM', category: 'monitor', price: 26500, stock: 12, image: getImg('gamingmonitor'), description: 'Built-in KVM for two PCs.' },
    { id: 'mon-004', name: 'BenQ ZOWIE XL2546K 24.5" 240Hz', category: 'monitor', price: 38000, stock: 10, image: getImg('monitor,zowie'), description: 'The esports standard.' },
    { id: 'mon-005', name: 'ASUS TUF VG249Q1A 24" 165Hz', category: 'monitor', price: 13500, stock: 40, image: getImg('monitor,ips'), description: 'Budget IPS gaming king.' },

    // Networking
    { id: 'net-001', name: 'TP-Link Archer AX55 WiFi 6 Router', category: 'networking', price: 6500, stock: 25, image: getImg('router,wifi'), description: 'Next-gen WiFi 6 speeds.' },
    { id: 'net-002', name: 'ASUS RT-AX88U Pro Dual Band WiFi 6', category: 'networking', price: 22000, stock: 10, image: getImg('router,asus'), description: 'Ultimate gaming router.' },
    { id: 'net-003', name: 'Netgear Nighthawk M6 Pro Mobile', category: 'networking', price: 75000, stock: 3, image: getImg('router'), description: '5G WiFi on the go.' },
    { id: 'net-004', name: 'D-Link DWA-X1850 WiFi 6 USB Adapter', category: 'networking', price: 3200, stock: 50, image: getImg('wifi,usb'), description: 'Easy WiFi 6 upgrade.' },

    // Peripherals
    { id: 'peri-001', name: 'Logitech G Pro X Superlight Mouse', category: 'peripheral', price: 11500, stock: 25, image: getImg('mouse,gaming'), description: 'Pro-grade wireless mouse.' },
    { id: 'peri-002', name: 'Keychron K2 V2 Mechanical Keyboard', category: 'peripheral', price: 7500, stock: 20, image: getImg('keyboard,mechanical'), description: 'Compact wireless typing.' },
    { id: 'peri-003', name: 'Razer BlackShark V2 Pro Headset', category: 'peripheral', price: 13000, stock: 15, image: getImg('headset,gaming'), description: 'Immersive wireless audio.' },
    { id: 'peri-004', name: 'SteelSeries Apex Pro TKL Keyboard', category: 'peripheral', price: 18500, stock: 8, image: getImg('keyboard,rgb'), description: 'Adjustable actuation switches.' },
    { id: 'peri-005', name: 'Blue Yeti USB Microphone Blackout', category: 'peripheral', price: 10500, stock: 15, image: getImg('microphone'), description: 'The world\'s #1 USB mic.' },
    { id: 'peri-006', name: 'Corsair K70 RGB TKL Champion Series', category: 'peripheral', price: 11000, stock: 12, image: getImg('keyboard,corsair'), description: 'Built for victory.' },
    { id: 'peri-007', name: 'HyperX QuadCast S RGB Mic', category: 'peripheral', price: 14500, stock: 10, image: getImg('mic,rgb'), description: 'Stunning RGB style.' }
];

const DB = {
    init: function () {
        const current = JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]');

        // Force update if we have many more products now (to ensure expansion takes effect)
        if (current.length < INITIAL_PRODUCTS.length) {
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
            console.log('Database updated with expanded catalog');
        } else if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        }

        [DB_KEYS.CART, DB_KEYS.WISHLIST, DB_KEYS.ORDERS].forEach(key => {
            if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
        });
    },

    getProducts: function (category = 'all') {
        const products = JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS));
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    },

    getAllProducts: function () {
        return JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]');
    },

    getProduct: function (id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === id);
    },

    saveProduct: function (product) {
        const products = this.getAllProducts();
        const existingIndex = products.findIndex(p => p.id === product.id);

        if (existingIndex >= 0) {
            products[existingIndex] = product;
        } else {
            products.push(product);
        }
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
        return true;
    },

    deleteProduct: function (id) {
        let products = this.getAllProducts();
        products = products.filter(p => p.id !== id);
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    }
};
