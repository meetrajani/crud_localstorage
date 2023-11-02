import React, { useEffect, useState } from 'react'

const Practice = () => {
    const get = () => {
        let all = localStorage.getItem('data');
        if (all) {
            return JSON.parse(all)
        } else {
            return [];
        }
    }
    const [data, setdata] = useState({
        id: Math.floor(Math.random() * 1000),
        name: "",
        email: ""
    })
    const [final, setfinal] = useState(get())
    
    const change = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const add = () => {
        setfinal([...final, data])
        setdata({
            id: Math.floor(Math.random() * 1000),
            name: "",
            email: "",
        })
    }

    const deletedata=(id)=>{
        const del=final.filter((val)=>val.id!==id)
        setfinal(del)
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(final))
    }, [final])
    return (
        <div>
            <input onChange={change} type="text" name="name" id="" />
            <br />
            <input onChange={change} type="text" name="email" id="" />
            <br />
            <button onClick={add}>Submit</button>
            <br /><br />
            <center>
                <table border={1}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            final.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td><button onClick={()=>deletedata(val.id)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </center>
        </div>
    )
}

export default Practice
