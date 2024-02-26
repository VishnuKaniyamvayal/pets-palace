import { Button, Table } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const PetsTable = () => {

    const [allpets, setAllPets] = useState([]);

    const fetchAllPets = async () => {
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/getallpet");
        setAllPets(res.data)
    }

   const  removePet = async( petid )=>{
        const res = await axios.delete(process.env.REACT_APP_DEV_BASE_URL + "api/admin/deletepet/" + petid);
        if(res.status == 200)
        {
            toast.success("Pet Successfully deleted");
            setAllPets(prevPets => prevPets.filter(pet => pet._id !== petid));
        }
    }

    useEffect(() => {
        fetchAllPets();
    }, [])

    return (
        <>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Pet Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Breed </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        allpets.map((pet,index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{Number(index)+1}</Table.Cell>
                                <Table.Cell>{pet.petName}</Table.Cell>
                                <Table.Cell>{pet.petBreed}</Table.Cell>
                                <Table.Cell>{pet.petAge}</Table.Cell>
                                <Table.Cell>{pet.petPrice}</Table.Cell>
                                <Table.Cell>{pet.petDesc}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{if(window.confirm("Are you sure to remove this pet")){removePet(pet._id)}}}>Remove</Button>  <Button color='blue'>Edit</Button></Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root>
        </>
    )
}

export default PetsTable