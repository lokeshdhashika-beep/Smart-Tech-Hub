const DB_KEYS = {
    PRODUCTS: 'sth_products',
    CART: 'sth_cart',
    WISHLIST: 'sth_wishlist',
    ORDERS: 'sth_orders',
    SALES: 'sth_sales',
    INQUIRIES: 'sth_inquiries'
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
    { id: 'networking', name: 'Networking', icon: 'fa-wifi' },
    { id: 'builder', name: 'PC Building Assistant', icon: 'fa-wand-magic-sparkles' }
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
    { id: 'ram-low-1', name: 'Consistent 4GB DDR3 1333MHz Desktop RAM', category: 'ram', price: 850, stock: 100, image: getImg('ram,old'), description: 'Budget DDR3 memory for older systems.' },
    { id: 'ram-high-1', name: 'Dominator Platinum RGB 64GB DDR5 6400MHz', category: 'ram', price: 24500, stock: 10, image: getImg('ram,corsair'), description: 'The pinnacle of DDR5 luxury.' },

    // Storage
    { id: 'ssd-001', name: 'Samsung 980 PRO 1TB NVMe Gen4 SSD', category: 'internal-storage', price: 8999, stock: 30, image: getImg('ssd,samsung'), description: 'Blazing fast Gen4 NVMe.' },
    { id: 'hdd-001', name: 'Seagate Barracuda 2TB 7200RPM HDD', category: 'internal-storage', price: 4200, stock: 60, image: getImg('harddrive'), description: 'Reliable high-capacity storage.' },
    { id: 'ssd-002', name: 'WD Black SN850X 2TB NVMe SSD', category: 'internal-storage', price: 15500, stock: 15, image: getImg('ssd,gaming'), description: 'Top-tier gaming storage.' },
    { id: 'ssd-003', name: 'Crucial P3 500GB NVMe SSD', category: 'internal-storage', price: 3200, stock: 80, image: getImg('ssd'), description: 'Budget friendly NVMe speed.' },
    { id: 'hdd-002', name: 'WD Blue 4TB Desktop HDD', category: 'internal-storage', price: 8500, stock: 20, image: getImg('harddisk'), description: 'Massive storage for creators.' },
    { id: 'ssd-004', name: 'Kingston NV2 2TB NVMe Gen4', category: 'internal-storage', price: 9500, stock: 25, image: getImg('ssd,pcie'), description: 'Gen4 speed at Gen3 prices.' },
    { id: 'ssd-005', name: 'Samsung 870 EVO 1TB SATA SSD', category: 'internal-storage', price: 7200, stock: 40, image: getImg('ssd,sata'), description: 'The industry standard SATA SSD.' },
    { id: 'ssd-low-1', name: 'Consistent 120GB SATA SSD', category: 'internal-storage', price: 999, stock: 150, image: getImg('ssd,cheap'), description: 'Super affordable OS drive.' },
    { id: 'ssd-high-1', name: 'Sabrent Rocket 4 Plus 8TB NVMe SSD', category: 'internal-storage', price: 98000, stock: 2, image: getImg('ssd,huge'), description: 'Massive 8TB of Gen4 speed.' },

    // GPU
    { id: 'gpu-001', name: 'ASUS ROG Strix GeForce RTX 4070 Ti 12GB', category: 'gpu', price: 82000, stock: 8, image: getImg('graphicscard,nvidia'), description: 'Ultimate cooling and performance.' },
    { id: 'gpu-002', name: 'Sapphire PULSE AMD Radeon RX 7800 XT 16GB', category: 'gpu', price: 54000, stock: 12, image: getImg('graphicscard,amd'), description: '1440p gaming leader.' },
    { id: 'gpu-003', name: 'Zotac Gaming GeForce RTX 3060 12GB', category: 'gpu', price: 25500, stock: 40, image: getImg('gpu'), description: 'Best value for ray tracing.' },
    { id: 'gpu-004', name: 'Gigabyte GeForce RTX 4090 Gaming OC 24GB', category: 'gpu', price: 175000, stock: 3, image: getImg('rtx4090'), description: 'The most powerful GPU ever.' },
    { id: 'gpu-005', name: 'MSI Radeon RX 6600 Mech 2X 8GB', category: 'gpu', price: 19999, stock: 25, image: getImg('radeon'), description: 'Great 1080p efficiency.' },
    { id: 'gpu-006', name: 'EVGA GeForce RTX 3080 FTW3 Ultra 10GB', category: 'gpu', price: 65000, stock: 5, image: getImg('rtx3080'), description: 'Iconic cooling design.' },
    { id: 'gpu-007', name: 'PowerColor Hellhound Radeon RX 7900 XTX', category: 'gpu', price: 92000, stock: 7, image: getImg('rx7900xtx'), description: 'AMD flagship performance.' },
    { id: 'gpu-low-1', name: 'NVIDIA GeForce GT 710 2GB DDR3', category: 'gpu', price: 3500, stock: 80, image: getImg('gpu,old'), description: 'Basic display output card.' },
    { id: 'gpu-high-1', name: 'MSI GeForce RTX 4090 SUPRIM LIQUID X', category: 'gpu', price: 195000, stock: 2, image: getImg('rtx4090,msi'), description: 'Hybrid cooled flagship.' },

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
    { id: 'cpu-low-1', name: 'Intel Pentium Gold G6405 4.1 GHz', category: 'cpu-intel', price: 5400, stock: 40, image: getImg('cpu,intel'), description: 'Solid dual-core for office work.' },
    { id: 'cpu-low-2', name: 'AMD Athlon 3000G with Radeon Graphics', category: 'cpu-amd', price: 4800, stock: 35, image: getImg('athlon'), description: 'Ideal for budget home PCs.' },
    { id: 'cpu-high-1', name: 'Intel Core i9-14900KS Special Edition', category: 'cpu-intel', price: 68000, stock: 4, image: getImg('i9,ks'), description: 'The absolute fastest Intel desktop CPU.' },

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
    { id: 'smps-low-1', name: 'Consistent 450W Standard PSU', category: 'smps', price: 1200, stock: 100, image: getImg('psu,cheap'), description: 'Basic power for office PCs.' },
    { id: 'smps-high-1', name: 'ASUS ROG Thor 1600W Titanium', category: 'smps', price: 42000, stock: 3, image: getImg('psu,rog'), description: 'World\'s quietest 1600W PSU.' },

    // Coolers
    { id: 'cool-001', name: 'DeepCool AK620 Digital CPU Air Cooler', category: 'cooler', price: 5800, stock: 25, image: getImg('cpucooler,fan'), description: 'Air cooler with temp display.' },
    { id: 'cool-002', name: 'NZXT Kraken 360 RGB AIO Cooler', category: 'cooler', price: 17500, stock: 12, image: getImg('liquidcooler'), description: 'Stunning RGB liquid cooling.' },
    { id: 'cool-003', name: 'Noctua NH-D15 chromax.black', category: 'cooler', price: 9500, stock: 15, image: getImg('noctua'), description: 'The legend of air cooling.' },
    { id: 'cool-004', name: 'Arctic Liquid Freezer II 240', category: 'cooler', price: 8200, stock: 20, image: getImg('aio,cooler'), description: 'Top tier cooling performance.' },
    { id: 'cool-005', name: 'Cooler Master Hyper 212 RGB Black', category: 'cooler', price: 3200, stock: 40, image: getImg('cooler,rgb'), description: 'The classic refined.' },
    { id: 'cool-low-1', name: 'Deepcool Alta 9 Entry Level Cooler', category: 'cooler', price: 450, stock: 80, image: getImg('fan'), description: 'Cheap and functional CPU fan.' },

    // Cabinets
    { id: 'case-001', name: 'Lian Li PC-O11 Dynamic EVO', category: 'case', price: 14500, stock: 10, image: getImg('pccase,lianli'), description: 'The ultimate builder case.' },
    { id: 'case-002', name: 'NZXT H5 Flow Compact Tower', category: 'case', price: 8500, stock: 20, image: getImg('pc,case'), description: 'Excellent airflow and design.' },
    { id: 'case-003', name: 'Corsair 4000D Airflow Tempered Glass', category: 'case', price: 7800, stock: 30, image: getImg('case,corsair'), description: 'Clean lines, great thermals.' },
    { id: 'case-004', name: 'Fractal Design North Charcoal Black', category: 'case', price: 13000, stock: 5, image: getImg('case,fractal'), description: 'Wood front panel aesthetic.' },
    { id: 'case-low-1', name: 'Consistent Budget ATX Cabinet', category: 'case', price: 1800, stock: 60, image: getImg('pc,tower'), description: 'Simple office style cabinet.' },
    { id: 'case-high-1', name: 'Cooler Master HAF 700 EVO', category: 'case', price: 48000, stock: 2, image: getImg('case,beast'), description: 'The high airflow flagship.' },

    // Monitors
    { id: 'mon-001', name: 'LG Ultragear 27GN800 27" 1440p 144Hz', category: 'monitor', price: 23000, stock: 15, image: getImg('monitor,gaming'), description: 'Crisp QHD IPS display.' },
    { id: 'mon-002', name: 'Samsung Odyssey G7 32" 240Hz', category: 'monitor', price: 45000, stock: 8, image: getImg('monitor,curved'), description: 'Ultimate curved immersion.' },
    { id: 'mon-003', name: 'Gigabyte M27Q 27" 170Hz KVM', category: 'monitor', price: 26500, stock: 12, image: getImg('gamingmonitor'), description: 'Built-in KVM for two PCs.' },
    { id: 'mon-004', name: 'BenQ ZOWIE XL2546K 24.5" 240Hz', category: 'monitor', price: 38000, stock: 10, image: getImg('monitor,zowie'), description: 'The esports standard.' },
    { id: 'mon-005', name: 'ASUS TUF VG249Q1A 24" 165Hz', category: 'monitor', price: 13500, stock: 40, image: getImg('monitor,ips'), description: 'Budget IPS gaming king.' },
    { id: 'mon-low-1', name: 'Consistent 15.4" Office Monitor', category: 'monitor', price: 3200, stock: 50, image: getImg('monitor,small'), description: 'Compact display for simple tasks.' },
    { id: 'mon-high-1', name: 'ASUS ROG Swift OLED PG42UQ 42"', category: 'monitor', price: 125000, stock: 3, image: getImg('monitor,oled'), description: 'The ultimate OLED gaming display.' },

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
    { id: 'peri-007', name: 'HyperX QuadCast S RGB Mic', category: 'peripheral', price: 14500, stock: 10, image: getImg('mic,rgb'), description: 'Stunning RGB style.' },

    // ADDITIONAL PRODUCTS
    { id: 'ram-budget-1', name: 'Zion 4GB DDR3 1600MHz Desktop RAM', category: 'ram', price: 650, stock: 120, image: getImg('ram,old'), description: 'Very cheap DDR3 memory.' },
    { id: 'ram-mid-1', name: 'Adata XPG Spectrix D50 16GB (8GBx2) DDR4 3200MHz', category: 'ram', price: 4200, stock: 45, image: getImg('ram,white'), description: 'Sleek white RGB memory.' },
    { id: 'ram-high-2', name: 'G.Skill Trident Z5 Royal 64GB DDR5 6400MHz', category: 'ram', price: 32000, stock: 5, image: getImg('ram,gold'), description: 'Luxurious gold leaf design DDR5.' },
    { id: 'cpu-intel-001', name: 'Intel Core i5-14400F 14th Gen', category: 'cpu-intel', price: 19500, stock: 40, image: getImg('intel,i5'), description: 'Excellent mid-range efficiency.' },
    { id: 'cpu-intel-002', name: 'Intel Core i7-12700K 12th Gen', category: 'cpu-intel', price: 26000, stock: 15, image: getImg('intel,i7'), description: 'Powerful 12th gen performance.' },
    { id: 'cpu-intel-003', name: 'Intel Celeron G5905 3.5 GHz', category: 'cpu-intel', price: 3800, stock: 100, image: getImg('intel,celeron'), description: 'Ultra budget CPU for simple tasks.' },
    { id: 'cpu-amd-001', name: 'AMD Ryzen 5 8600G with Radeon 760M', category: 'cpu-amd', price: 21000, stock: 25, image: getImg('amd,8600g'), description: 'Best integrated graphics CPU.' },
    { id: 'cpu-amd-002', name: 'AMD Ryzen 3 3200G with Vega 8', category: 'cpu-amd', price: 7500, stock: 60, image: getImg('amd,ryzen3'), description: 'Budget gaming start.' },
    { id: 'gpu-mid-1', name: 'NVIDIA GeForce RTX 4060 Ti 8GB', category: 'gpu', price: 38500, stock: 30, image: getImg('rtx4060ti'), description: 'Efficient 1080p high refresh gaming.' },
    { id: 'gpu-mid-2', name: 'AMD Radeon RX 7600 8GB', category: 'gpu', price: 24500, stock: 40, image: getImg('rx7600'), description: 'Great value RDNA3 card.' },
    { id: 'gpu-budget-1', name: 'AMD Radeon RX 550 4GB', category: 'gpu', price: 6500, stock: 50, image: getImg('gpu,cheap'), description: 'Entry level graphics for e-sports.' },
    { id: 'ssd-high-2', name: 'Samsung 990 PRO 4TB NVMe SSD', category: 'internal-storage', price: 32000, stock: 8, image: getImg('ssd,samsung,990'), description: 'The fastest 4TB drive available.' },
    { id: 'ssd-mid-1', name: 'Crucial P5 Plus 1TB Gen4 NVMe', category: 'internal-storage', price: 6800, stock: 50, image: getImg('ssd,crucial'), description: 'Reliable Gen4 speed.' },
    { id: 'hdd-budget-1', name: 'WD Blue 1TB 7200RPM HDD', category: 'internal-storage', price: 3500, stock: 100, image: getImg('hdd,1tb'), description: 'Standard mass storage.' },
    { id: 'mobo-budget-1', name: 'Ant Esports H61M Motherboard', category: 'motherboard', price: 3500, stock: 80, image: getImg('motherboard,cheap'), description: 'Simple board for old Intel CPUs.' },
    { id: 'mobo-mid-1', name: 'ASUS TUF Gaming B650-Plus WiFi', category: 'motherboard', price: 19500, stock: 30, image: getImg('asus,tuf,mobo'), description: 'Durable AM5 gaming board.' },
    { id: 'case-budget-1', name: 'Consistent Mini Tower Case', category: 'case', price: 1200, stock: 150, image: getImg('case,small'), description: 'Compact office case.' },
    { id: 'case-mid-1', name: 'Deepcool Matrexx 55 V3 Mesh', category: 'case', price: 4500, stock: 40, image: getImg('deepcool,case'), description: 'Great airflow mid-tower.' },
    { id: 'smps-mid-1', name: 'Deepcool PK550D 550W 80+ Bronze', category: 'smps', price: 3400, stock: 60, image: getImg('smps,bronze'), description: 'Reliable bronze power.' },
    { id: 'smps-high-2', name: 'EVGA SuperNOVA 1300 G+', category: 'smps', price: 21000, stock: 5, image: getImg('evga,titanium'), description: 'Massive power for heavy systems.' },

    // ADDITIONAL PRODUCTS (Batch 2)
    { id: 'mobo-budget-2', name: 'Consistent H81 Motherboard', category: 'motherboard', price: 2800, stock: 60, image: getImg('mobo,h81'), description: 'Ideal for budget i3/i5 builds.' },
    { id: 'mobo-mid-2', name: 'MSI B450M-A PRO MAX', category: 'motherboard', price: 5500, stock: 40, image: getImg('msi,b450'), description: 'Great value AM4 board.' },
    { id: 'mobo-high-1', name: 'ASUS ROG STRIX Z790-E GAMING WIFI', category: 'motherboard', price: 48000, stock: 10, image: getImg('strix,z790'), description: 'Elite tier Intel motherboard.' },
    { id: 'smps-mid-2', name: 'Ant Esports VS500L Power Supply', category: 'smps', price: 1800, stock: 100, image: getImg('psu,cheap'), description: 'Basic reliable power.' },
    { id: 'smps-high-3', name: 'Corsair AX1600i 1600W Titanium', category: 'smps', price: 55000, stock: 2, image: getImg('psu,1600w'), description: 'The absolute best PSU in existence.' },
    { id: 'case-mid-2', name: 'Ant Esports ICE-130AG Cabinet', category: 'case', price: 3200, stock: 50, image: getImg('case,rgb'), description: 'Affordable RGB gaming case.' },
    { id: 'case-high-2', name: 'Fractal Design Torrent White', category: 'case', price: 18500, stock: 6, image: getImg('case,fractal'), description: 'Legendary airflow performance.' },
    { id: 'mon-mid-2', name: 'Samsung 27" Odyssey G5 Gaming', category: 'monitor', price: 21500, stock: 20, image: getImg('samsung,g5'), description: '1440p 144Hz curved gaming.' },
    { id: 'mon-budget-2', name: 'LG 19" Office Monitor HD', category: 'monitor', price: 4500, stock: 60, image: getImg('lg,monitor'), description: 'Budget office display.' },
    { id: 'cpu-budget-3', name: 'AMD Athlon 3000G Tray (No Cooler)', category: 'cpu-amd', price: 3200, stock: 100, image: getImg('athlon,cpu'), description: 'Cheapest way to get a PC running.' },
    { id: 'gpu-budget-2', name: 'NVIDIA GeForce GT 1030 2GB', category: 'gpu', price: 7200, stock: 40, image: getImg('gpu,1030'), description: 'Budget 1080p video output.' },
    { id: 'ram-budget-2', name: 'Crucial 4GB DDR4 2666MHz RAM', category: 'ram', price: 1100, stock: 150, image: getImg('ram,4gb'), description: 'Standard DDR4 office RAM.' },
    { id: 'ram-high-3', name: 'TeamGroup T-Force XTREEM ARGB 32GB', category: 'ram', price: 16500, stock: 15, image: getImg('ram,xtreem'), description: 'Award winning high-speed RAM.' },
    { id: 'ssd-budget-2', name: 'Consistent 256GB SATA SSD', category: 'internal-storage', price: 1450, stock: 80, image: getImg('ssd,entry'), description: 'Solid budget boot drive.' },
    // New Additions
    { id: 'gpu-008', name: 'NVIDIA GeForce RTX 4080 Super', category: 'gpu', price: 105000, stock: 5, image: getImg('rtx4080'), description: 'Supercharged performance for 4K.' },
    { id: 'gpu-009', name: 'AMD Radeon RX 7900 GRE', category: 'gpu', price: 58000, stock: 10, image: getImg('rx7900gre'), description: 'Excellent 1440p value.' },
    { id: 'cpu-high-2', name: 'Intel Core i9-14900KS', category: 'cpu-intel', price: 72000, stock: 3, image: getImg('i9-14900ks'), description: 'Special edition peak performance.' },
    { id: 'cpu-mid-3', name: 'AMD Ryzen 7 8700G', category: 'cpu-amd', price: 32000, stock: 12, image: getImg('ryzen8700g'), description: 'Best-in-class integrated graphics.' },
    { id: 'mon-high-2', name: 'Samsung Odyssey Neo G8 32"', category: 'monitor', price: 85000, stock: 5, image: getImg('monitor,4k,240hz'), description: '4K 240Hz Mini-LED excellence.' },
    { id: 'mon-mid-3', name: 'LG UltraGear 27GR93U 4K 144Hz', category: 'monitor', price: 52000, stock: 8, image: getImg('monitor,lg,4k'), description: 'Crisp 4K high refresh gaming.' },
    { id: 'peri-008', name: 'Razer Huntsman V3 Pro TKL', category: 'peripheral', price: 19500, stock: 15, image: getImg('keyboard,razer'), description: 'Analog optical switches.' },
    { id: 'peri-009', name: 'Logitech G502 X Plus Wireless', category: 'peripheral', price: 14000, stock: 20, image: getImg('mouse,logitech'), description: 'Iconic mouse evolved.' },
    { id: 'case-005', name: 'Be Quiet! Shadow Base 800 FX', category: 'case', price: 16000, stock: 6, image: getImg('case,bequiet'), description: 'Premium silent airflow.' },
    { id: 'case-006', name: 'NZXT H9 Elite Dual-Chamber', category: 'case', price: 21000, stock: 4, image: getImg('case,nzxt,h9'), description: 'Panoramic glass showcase.' },
    { id: 'mobo-high-2', name: 'MSI MEG Z790 ACE', category: 'motherboard', price: 62000, stock: 5, image: getImg('mobo,z790,ace'), description: 'Robust power for Intel 14th Gen.' },
    { id: 'mobo-mid-3', name: 'Gigabyte X670E AORUS Master', category: 'motherboard', price: 45000, stock: 7, image: getImg('mobo,x670e'), description: 'Elite AM5 feature set.' },
    { id: 'cool-006', name: 'Corsair iCUE H150i Elite LCD XT', category: 'cooler', price: 24000, stock: 10, image: getImg('aio,lcd'), description: 'LCD screen liquid cooling.' },
    { id: 'smps-high-4', name: 'Seasonic Prime TX-1000 Titanium', category: 'smps', price: 32000, stock: 5, image: getImg('psu,seasonic'), description: 'Highest efficiency 1000W power.' },
    { id: 'peri-010', name: 'Elgato Stream Deck MK.2', category: 'peripheral', price: 13500, stock: 25, image: getImg('streamdeck'), description: 'Advanced streaming control.' }
];

const DB = {
    // Internal Helper for safe parsing
    _get: function (key, fallback = []) {
        try {
            const item = localStorage.getItem(key);
            if (!item || item === 'undefined' || item === 'null') return fallback;
            const parsed = JSON.parse(item);
            return parsed || fallback;
        } catch (e) {
            console.error(`Error reading ${key}:`, e);
            return fallback;
        }
    },

    _set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error saving ${key}:`, e);
        }
    },

    init: function () {
        try {
            // Initialize Products
            const currentProducts = this._get(DB_KEYS.PRODUCTS, []);
            if (currentProducts.length < INITIAL_PRODUCTS.length) {
                this._set(DB_KEYS.PRODUCTS, INITIAL_PRODUCTS);
                console.log('Product database initialized/updated.');
            }

            // Initialize Users if sth_users doesn't exist (Move from auth.js logic)
            const USERS_KEY = 'sth_users';
            if (!localStorage.getItem(USERS_KEY)) {
                const defaultUsers = [
                    { id: 'u1', name: 'Admin', email: 'admin', password: 'admin', role: 'admin' },
                    { id: 'u2', name: 'Demo User', email: 'user@demo.com', password: '123', role: 'user' }
                ];
                localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
            }

            // Initialize other collections
            [DB_KEYS.CART, DB_KEYS.WISHLIST, DB_KEYS.ORDERS, DB_KEYS.SALES, DB_KEYS.INQUIRIES].forEach(key => {
                const item = localStorage.getItem(key);
                if (!item || item === 'undefined') {
                    this._set(key, []);
                }
            });
        } catch (e) {
            console.error('DB Init Error:', e);
        }
    },

    // --- Product Methods ---
    getProducts: function (category = 'all') {
        const products = this._get(DB_KEYS.PRODUCTS);
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    },

    getAllProducts: function () {
        return this._get(DB_KEYS.PRODUCTS);
    },

    getProduct: function (id) {
        return this.getAllProducts().find(p => p.id === id);
    },

    saveProduct: function (product) {
        const products = this.getAllProducts();
        const existingIndex = products.findIndex(p => p.id === product.id);
        if (existingIndex >= 0) products[existingIndex] = product;
        else products.push(product);
        this._set(DB_KEYS.PRODUCTS, products);
        return true;
    },

    deleteProduct: function (id) {
        const products = this.getAllProducts().filter(p => p.id !== id);
        this._set(DB_KEYS.PRODUCTS, products);
    },

    // --- User Methods ---
    getUsers: function () {
        return this._get('sth_users', []);
    },

    saveUser: function (user) {
        const users = this.getUsers();
        const existingIndex = users.findIndex(u => u.id === user.id || u.email === user.email);
        if (existingIndex >= 0) users[existingIndex] = user;
        else users.push(user);
        this._set('sth_users', users);
        return true;
    },

    findUser: function (predicate) {
        return this.getUsers().find(predicate);
    },

    getCurrentUser: function () {
        return this._get('sth_current_user', null);
    },

    setCurrentUser: function (user) {
        this._set('sth_current_user', user);
    },

    // --- Cart & Wishlist Methods ---
    getCart: function () {
        return this._get(DB_KEYS.CART);
    },

    saveCart: function (cart) {
        this._set(DB_KEYS.CART, cart);
    },

    getWishlist: function () {
        return this._get(DB_KEYS.WISHLIST);
    },

    saveWishlist: function (wishlist) {
        this._set(DB_KEYS.WISHLIST, wishlist);
    },

    // --- Inquiry & Order Methods ---
    getInquiries: function () {
        return this._get(DB_KEYS.INQUIRIES);
    },

    saveInquiry: function (inquiry) {
        const inquiries = this.getInquiries();
        const newInq = {
            id: inquiry.id || 'inq-' + Date.now(),
            timestamp: inquiry.timestamp || new Date().toISOString(),
            ...inquiry
        };
        inquiries.push(newInq);
        this._set(DB_KEYS.INQUIRIES, inquiries);
        return true;
    },

    getOrders: function () {
        return this._get(DB_KEYS.ORDERS);
    },

    saveOrder: function (order) {
        const orders = this.getOrders();
        const newOrder = {
            id: order.id || 'ord-' + Date.now(),
            timestamp: order.timestamp || new Date().toISOString(),
            ...order
        };
        orders.push(newOrder);
        this._set(DB_KEYS.ORDERS, orders);
        return true;
    },

    deleteInquiry: function (id) {
        const inquiries = this.getInquiries().filter(i => i.id !== id);
        this._set(DB_KEYS.INQUIRIES, inquiries);
    },

    deleteOrder: function (id) {
        const orders = this.getOrders().filter(o => o.id !== id);
        this._set(DB_KEYS.ORDERS, orders);
    }
};
