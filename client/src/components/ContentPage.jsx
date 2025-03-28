//SearchBox
//Show Data
import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"

function ContentPage () {
    const [search,setSearch]=useState("")
    const [location,setLocation]=useState([])

    //ดึง Location จาก Data ด้วย search
    const getLocation = async () =>{
        try {
            const result = await axios.get(`http://localhost:4001/trips?keywords=${search}`);
            console.log(result.data.data);
            setLocation(result.data.data)  
        } catch (error) {
            console.error("Error fetching location data:", error);
            
        }
    }
    
    // เก็บข้อมูลจาก Searchbox
    const handleSearch =(event)=>{
       setSearch(event.target.value)
    }

    //เมื่อมีขข้อมูลที่ Searchbox จะเรียกข้อมูลจากgetLocatiion
    useEffect(()=>{
        if (search.trim() !== "") {
            getLocation();
        }
    },[search])


    return(
        <section>
        <div>
            <h1>search box</h1>
            <input 
            type="text"  
            value={search}
            onChange={handleSearch}
            />
        
            {location.length > 0 ?
            location.map((location) => (
                <div key={location.eid}>
                    {location.title}
                    <br />
                    {location.description}
                    <br />
                    {location.tags}
                </div>
                
            )) : (
                <p>No locations found.</p>
            )}
           
            
        </div>
        </section>
    )
}

export default ContentPage


//