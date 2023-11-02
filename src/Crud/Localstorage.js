import React, { useEffect, useState } from "react";

const Localstorage = () => {
    const get = () => {
        let all = localStorage.getItem("data");
        if (all) {
            return JSON.parse(all);
        } else {
            return [];
        }
    };

    const [data, setdata] = useState({
        id: Math.floor(Math.random() * 100),
        name: "",
        email: "",
    });
    const [final, setfinal] = useState(get());
    const [update, setupdate] = useState(false);

    const submitdata = (e) => {
        setfinal([...final, data]);
        setdata({
            id: Math.floor(Math.random() * 100),
            name: "",
            email: "",
        });
    };

    const change = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(final));
    }, [final]);

    const deletedata = (id) => {
        const del = final.filter((val) => val.id !== id);
        setfinal(del);
    };

    const updateData = () => {
        let updatedFinal = final.map((val, index) => {
            if (val.id === data.id) {
                val.name = data.name;
                val.email = data.email;
            }
            return val;
        });
        setfinal(updatedFinal);
        setdata({
            id: Math.floor(Math.random() * 100),
            name: "",
            email: "",
        });
        setupdate(false);
    };
    const editdata = (val) => {
        setdata(val);
        setupdate(true);
    };

    return (
        <center>
            <div>
                <input
                    type="text"
                    onChange={change}
                    placeholder="Username"
                    name="name"
                    value={data.name}
                />
                <br />
                <input
                    type="text"
                    onChange={change}
                    placeholder="UserEmail"
                    name="email"
                    value={data.email}
                />
                <br />
                {update ? (
                    <button onClick={updateData}>Update</button>
                ) : (
                    <button onClick={submitdata}>Submit</button>
                )}
            </div>
            <h1>Details</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {final.map((val, index) => {
                        return (
                            <tr key={index}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>
                                    <button onClick={() => deletedata(val.id)}>
                                        Delete
                                    </button>
                                    <button onClick={() => editdata(val)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </center>
    );
};

export default Localstorage;

