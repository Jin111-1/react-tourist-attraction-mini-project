import axios from "axios";
import React, { useState, useEffect } from "react";
import ReadMore from "./reuse element/ReadMorebutton";

function ContentPage() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState([]);

    // ดึง Location จาก Data ด้วย search
    const getLocation = async () => {
        try {
            const result = await axios.get(`http://localhost:4001/trips?keywords=${search}`);
            console.log(result.data.data);
            setLocation(result.data.data);
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };

    // เก็บข้อมูลจาก Searchbox
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    // เมื่อมีข้อมูลที่ Searchbox จะเรียกข้อมูลจาก getLocation
    useEffect(() => {
        if (search.trim() !== "") {
            getLocation();
        }
    }, [search]);

    return (
        <section className="w-full min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
                <div className="text-center text-lg font-semibold text-blue-600 mb-4">ค้นหาสถานที่</div>
                <input 
                    type="text"  
                    value={search}
                    onChange={handleSearch}
                    placeholder="หาที่เที่ยวแล้วไปกัน..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="mt-4 space-y-4">
                    {location.length > 0 ? (
                        location.map((loc) => (
                            <div key={loc.eid} className="bg-gray-50 p-4 rounded-lg shadow flex gap-[20px]">

                                <img src={loc.photos[0]} alt={loc.title} className="w-[300px]  object-cover rounded-md mb-2" />
                                <div>
                                <h3 className="text-lg font-semibold text-gray-800">{loc.title}</h3>
                                <p className="text-gray-600 text-sm"><ReadMore text={loc.description}/></p>
                                <p className="text-blue-500 text-xs mt-2">หมวด : {loc.tags.join(", ")}</p>
                                <div className="mt-[20px] flex justify-evenly">
                                <img src={loc.photos[1]} className="w-[100px] object-cover rounded-md mb-2" />
                                <img src={loc.photos[2]} className="w-[100px] object-cover rounded-md mb-2" />
                                <img src={loc.photos[3]} className="w-[100px] object-cover rounded-md mb-2" />
                                </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No locations found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ContentPage;
