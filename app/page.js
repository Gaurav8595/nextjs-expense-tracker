"use client"
import { collection, doc, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc } from "firebase/firestore";
import { useState,useEffect } from 'react'
import { Inter } from 'next/font/google'
import { db } from "../config/firebase";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [items,setItems]=useState([
    // {name:"coffee", price:12},
    // {name:"Movie", price:15},
    // {name:"candy", price:5},

  ])
  const [newItem,setNewItem]=useState({name:'', price:''})
  const [total,setTotal]=useState(0)

  // add item to db
  const addItem = async (e) => {
    e.preventDefault()
    if (newItem.name!=='' && newItem.price !==''){
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'items'),{
        name:newItem.name.trim(),
        price:newItem.price,
      })
      setNewItem({name:'', price:''})
    }
  }

  // read item from db
  useEffect(()=> {
     const q = query(collection(db, 'items'))
     const unsubscribe = onSnapshot(q, (querySnapshot)=> {
      let itemsArr = []

      querySnapshot.forEach((doc)=> {
        itemsArr.push({...doc.data(), id:doc.id})
      })
      setItems(itemsArr)



      // read total from itemsArr
      const calculateTotal=()=>{
        const totalPrice = itemsArr.reduce(
          (sum, item)=>sum + parseFloat(item.price), 0
        )
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe()
     })
  },[])

  // delete items from db
  const deleteItem = async (id)=> {
    await deleteDoc(doc(db, 'items', id))
  }


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className=' bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center  text-black'>
            <input value={newItem.name} 
            onChange={(e)=> setNewItem({...newItem, name:e.target.value})} 
            className='col-span-3 p-3 border ' type="text" placeholder='Enter Item'/>
            <input value={newItem.price} 
            onChange={(e)=> setNewItem({...newItem, price:e.target.value})} 
            className='col-span-2 p-3 border ml-2' type="number" placeholder='Enter $'/>
            <button 
            onClick={addItem} 
            className='text-white bg-slate-950 hover:bg-green-900 p-3 text-xl m-1' type='submit'>+</button>
          </form>
          <ul>
            {items.map((item, id)=> (
              <li key={id} 
              className='my-4 w-full flex justify-between bg-slate-900'>
              <div className='p-4 w-full flex justify-between'>
                <span className='capitalize text-white'>{item.name}</span>
                <span className="text-white">{item.price}</span>
              </div>
              <button 
              onClick={()=> deleteItem(item.id)}
              className='ml-8 p-4 border-l-2 bg-red-700 border-red-900 hover:bg-red-900 w-16 text-white'>X</button>
            </li>
            ))}
          </ul>
          {items.length < 1? (''): (
            <div className='flex justify-between p-3'>
              <span className="text-white">Total</span>
              <span className="text-white">${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
