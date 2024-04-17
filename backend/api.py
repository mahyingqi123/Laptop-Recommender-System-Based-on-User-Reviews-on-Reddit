from flask import Flask, request, jsonify

app = Flask(__name__)
"""
Run this code, 
then access the API through
http://127.0.0.1:5000/search_result

"""
@app.route('/search_result', methods=['GET'])
def home():
    user_query = request.args.get('query')

    result = {
        "query": user_query,
        "laptop_list":[{
        "name":"Acer Predator Helios Neo 16 ",
        "url": "https://technave.com/gadget/Acer-Predator-Helios-Neo-16-Price-in-Malaysia-Specs-37606.html",
        "price": "5899",
        "specs": {
            "Release Status": "Release 2024, Feb",
            "Processor": "Intel\u00ae Core\u2122 i5-14500HX",
            "Clock Speed": "2.6 GHz",
            "Max Clock Speed": "4.9 GHz",
            "GPU": "NVIDIA\u00ae GeForce\u00ae RTX4060 8GB GDDR6",
            "RAM": "8GB DDR5 5600Mhz (Upgradable to 64GB DDR5); 1TB PCIe NVMe Gen4 SSD",
            "SSD": "1TB, PCIe Gen4, 16 Gb/s, NVMe",
            "OS": "Windows 11 Home",
            "Display Size": "40.6 cm (16\") 165Hz",
            "Display Type": "IPS (In-Plane Switching) technology, LCD, WQXGA Ultra Slim Design, 16:10 Aspect Ratio sRGB 100%",
            "Touch Screen": "microSD supported",
            "Power Adapter": "5.5 PHY AC adapter 330 W",
            "Battery Capacity": "4-cell Lithium Ion (Li-Ion) 90 Wh",
            "Battery Hour": "Up to 6 Hour",
            "Dimension": "25.95 x 278.63 x 357.78 mm",
            "Weight": "2.80 kg",
            "IO Ports": "HDMI Yes\nUSB Yes\nNumber of USB 3.2 Gen 1 Port 1\nNumber of USB 3.2 Gen 2 Port 1\nTotal Number of USB Ports 5\nNetwork (RJ-45) Yes\nAudio Line In Yes\nAudio Line Out Yes",
            "Camera": "Yes",
            "Keyboard": "4-Zone RGB Keyboard, Backlight",
            "Touchpad": "TouchPad",
            "WIFI": "Intel\u00ae Killer Wi-Fi 6E AX1675i 802.11a/b/g/n+ax",
            "Bluetooth": "Supports Bluetooth\u00ae 5.3 or above",
            "Speaker": "2 x speakers",
            "Mic": "Yes",
            "Warranty": "2 Years Onsite Warranty + Accidental Damage / Theft Warranty"
        }
        }
    ,
     {
        "name":"Acer Predator Helios 16",
        "url": "https://technave.com/gadget/Acer-Predator-Helios-16-Price-in-Malaysia-Specs-37603.html",
        "price": "9999",
        "specs": {
            "Release Status": "Release 2024, Feb",
            "Processor": "Intel\u00ae Core\u2122 i9-14900HX processor",
            "Clock Speed": "2.2 GHz",
            "Max Clock Speed": "5.8 GHz",
            "GPU": "NVIDIA\u00ae GeForce\u00ae RTX4070 8GB GDDR6",
            "RAM": "32GB DDR5 5600Mhz (Upgradable to 64GB DDR5); 2TB RAID 0 PCIe NVMe Gen4 SSD",
            "SSD": "2TB PCIe NVMe, RAID 0 SSD",
            "OS": "Windows 11 Home",
            "Display Size": "40.6 cm (16\") 240Hz",
            "Display Type": "IPS (In-Plane Switching) technology, LCD, WQXGA Ultra Slim Design",
            "Power Adapter": "330 W 5.5 PHY AC adapter",
            "Battery Capacity": "4-cell Lithium Ion (Li-Ion) 90 Wh",
            "Battery Hour": "Up to 6.50 Hour",
            "Dimension": "24.9 x 277.55 x 357.78 mm",
            "Weight": "2.65 kg",
            "IO Ports": "HDMI Yes\nUSB Yes\nNumber of USB 3.2 Gen 1 Port 1\nNumber of USB 3.2 Gen 2 Port 1\nTotal Number of USB Ports 5\nNetwork (RJ-45) Yes\nAudio Line In No\nAudio Line Out Yes",
            "Keyboard": "Per-Key RGB Keyboard with Interchangeable MagKey3.0",
            "Touchpad": "TouchPad",
            "WIFI": "Killer Wi-Fi 7",
            "Bluetooth": "Supports Bluetooth\u00ae 5.3 or above",
            "Speaker": "2 x speakers",
            "Mic": "Yes",
            "Warranty": "2 Years OnSite + Accidental Damage / Theft Warranty with 1st Year International Travelers Warranty"
        }
    },
     {
        "name":"Acer Predator Helios 18",
        "url": "https://technave.com/gadget/Acer-Predator-Helios-18-Price-in-Malaysia-Specs-37601.html",
        "price": "12999",
        "specs": {
            "Release Status": "Release 2024, Feb",
            "Processor": "Intel\u00ae Core\u2122 i9-14900HX processor",
            "Clock Speed": "2.2 GHz",
            "Max Clock Speed": "5.8 GHz",
            "GPU": "NVIDIA\u00ae GeForce\u00ae RTX4080 12GB GDDR6",
            "RAM": "32GB DDR5 5600Mhz (Upgradable to 64GB DDR5); 2TB RAID 0 PCIe NVMe Gen4 SSD",
            "SSD": "2TB PCIe NVMe, RAID 0 SSD",
            "OS": "Windows 11 Home",
            "Display Size": "45.72 cm (18\"), 250Hz",
            "Display Type": "LCD, WQXGA, Mini LED Ultra Slim Design, IPS (In-Plane Switching) technology",
            "Power Adapter": "Max 330 W",
            "Battery Capacity": "4-cell Li-ion 90 Wh",
            "Battery Hour": "Up to 5.50 Hour",
            "Dimension": "26.9 x 311.6 x 404 mm",
            "Weight": "3.25 kg",
            "Colors": "Black",
            "IO Ports": "HDMI Yes\nUSB Yes\nNumber of USB 3.2 Gen 1 Port 1\nNumber of USB 3.2 Gen 2 Port 1\nTotal Number of USB Ports 5\nNetwork (RJ-45) Yes\nAudio Line In No\nAudio Line Out Yes",
            "Camera": "Yes",
            "Keyboard": "Per-Key RGB Keyboard with Interchangeable MagKey3.0",
            "Touchpad": "Yes",
            "WIFI": "Intel\u00ae Killer Wi-Fi 7",
            "Bluetooth": "Bluetooth 5.3 or above",
            "Speaker": "2 x speakers",
            "Mic": "Yes",
            "Warranty": "2 Years OnSite + Accidental Damage / Theft Warranty with 1st Year International Travelers Warranty"
        }
    }
        ]}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)