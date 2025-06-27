import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const pass = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getpasswords = async () => {
      let req = await fetch("http://localhost:3000")
      let passwords = await req.json()
      setpasswordArray(passwords)
      console.log(passwords);
        
    }
    
    useEffect(() => {
       getpasswords(); 
    }, [])


    const showPassword = () => {
        // alert(Show password);
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png";
            pass.current.type = "password";
        }
        else {
            ref.current.src = "icons/eye.png";
            pass.current.type = "text";
        }
    }

    const savePassword = async () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){

            // if any such id exists in the db then delete it
            await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id: form.id}) })
            console.log(form)
            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...form, id: uuidv4()}) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form, id: uuidv4()}]))
            // console.log(passwordArray)
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "dark",
                transition: Slide,
            });
        }
        else {
            toast('Error: Password not saved ❌', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "dark",
                transition: Slide,
            });
        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Slide,
        });
        navigator.clipboard.writeText(text)
    }

    const editPassword = (id) => {
        console.log(`Editing password with id: ${id}`)
        setform({...passwordArray.find(item => item.id === id), id:id})
        setpasswordArray(passwordArray.filter(item=> item.id!==id))
    }
    
    const deletePassword = async (id) => {
        let c = confirm(`Do you want to delete this password`)
        if(c){
            console.log(`Deleting password with id: ${id}`)
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...form, id}) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password deleted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Slide,
        });
        }
    }





    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Slide}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="pb-10 mycontainer min-h-[">
                <div className=" flex flex-col p-2 ">
                    <div className='text-4xl font-bold text-center'><span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-700'>OP/&gt;</span>
                    </div>
                    <p className='text-green-700 text-sm text-center'>Your own password Manager</p>
                    <div className='flex flex-col p-4 text-black gap-6 items-center'>
                        <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' type="text" name='site' id='site' className='w-full bg-white rounded-full border border-green-700 p-4 py-0' />
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <input value={form.username} onChange={handlechange} placeholder='Enter username' className=' w-full border bg-white border-green-700 px-4 py-0 rounded-full ' type="text" name='username' id='username' />
                            <div className="relative w-2/4">
                                <input ref={pass} value={form.password} onChange={handlechange} placeholder='Enter password' className='w-full border bg-white border-green-700 px-4 py-0 rounded-full ' type="password" name='password' id='password' />
                                <span onClick={showPassword} className="absolute right-2 top-0.5 cursor-pointer"><img ref={ref} width={20} src="/icons/eyecross.png" alt="" /></span>
                            </div>
                        </div>
                        <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 text-xs font-bold w-fit rounded-full px-3 py-2 hover:bg-green-300 border border-green-900'>
                            <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }} >
                        </lord-icon>
                            Save Password
                        </button>
                    </div>
                </div>
                <div className="passwords">
                    <h1 className="font-bold text-xl py-2">Your Passwords</h1>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-2xl overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center w-30 text-sm py-1'>
                                        <div className="flex justify-center gap-3 ">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <lord-icon className='cursor-pointer'
                                                onClick={() => { copyText(item.site) }}
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" ></lord-icon>
                                        </div>
                                    </td>
                                    <td className='text-center w-30 text-sm py-1'>
                                        <div className="flex justify-center gap-3 ">
                                            {item.username}
                                            <lord-icon className='cursor-pointer'
                                                onClick={() => { copyText(item.username) }}
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" ></lord-icon>
                                        </div></td>
                                    <td className='text-center w-30 text-sm py-1'>
                                        <div className="flex justify-center gap-3 ">
                                            {"*".repeat(item.password.length)}
                                            <lord-icon className='cursor-pointer'
                                                onClick={() => { copyText(item.password) }}
                                                style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" ></lord-icon>
                                        </div></td>
                                    <td className='text-center w-30 text-sm py-1 '>
                                        <div className='flex justify-center gap-9'>
                                            <lord-icon
                                                onClick={()=>{editPassword(item.id)}}
                                                className="cursor-pointer"
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            <lord-icon
                                                onClick={()=>{deletePassword(item.id)}}
                                                className="cursor-pointer"
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>

    )
}

export default Manager
