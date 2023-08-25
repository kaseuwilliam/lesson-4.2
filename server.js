const express = require('express')
const app = express()
const port = 3000

let peopleDatabase = [

    {
        name:"jeff_b",
        age:33,
        location:"Dallas"
    },
    {
        name:"emilia",
        age:17,
        location:"Minnesota"
    },
    {
        name:"rebecca",
        age:60,
        location:"Raleigh"
    },

]

app.use(express.json())

app.get('/', (req,res)=>{

    console.log("This is the get / request")
    res.status(200).json({message: "This is the response"})
})

app.get('/people', (req, res)=>{

    res.status(200).json({data:peopleDatabase})

})

app.get('/people/:name', (req, res)=>{

    let nameToFind = req.params.name
    
    // for( let i=0; i<peopleDatabase.length; i++){

    //     let potentialPerson = peopleDatabase[i]
    //     let nameOfPotentialPerson = potentialPerson.name

    //     if( nameOfPotentialPerson === nameToFind){

    //         return res.status(200).json(potentialPerson)

    //     }

    // } 

    let potentialPerson = peopleDatabase.filter( people => people.name === nameToFind )

    if(potentialPerson.length > 0){
        
        res.status(200).json(potentialPerson[0])

    } else{

        res.status(404).json({message:"Person not found"})
    }

} )


app.delete('/people/:name', (req, res)=>{

    let personToDelete = req.params.name //jeff_b

    let filtered = peopleDatabase.filter(person => person.name !== personToDelete)

    let lengthComparison = peopleDatabase.length - filtered.length // 0 means no delete happened and >0 means delete happened.

    peopleDatabase = [...filtered]

    if (lengthComparison > 0){
        
        res.status(200).json(peopleDatabase)

    } else {

        res.status(404).json({message:"The person does not exist"})
    }


})


app.post('/people', (req, res)=>{

    // add code to make sure there's no duplicates

    let personToAdd = req.body

    peopleDatabase.push(personToAdd)

    res.status(201).json(peopleDatabase)

})


app.put('/people/:name', (req, res)=>{


    for (let i=0; i< peopleDatabase.length; i++){

        // find the person
        let potentialPerson = peopleDatabase[i]
        let nameOfPotentialPerson = potentialPerson.name

        if(nameOfPotentialPerson === req.params.name){
            // I found my person

            let updatedInformation = req.body
            
            peopleDatabase[i] = updatedInformation

            return res.status(200).json(peopleDatabase)

        }

    }

    return res.status(404).json({message:"Person not found"})
})



app.listen(port, ()=>{
    console.log("The server is running")
})