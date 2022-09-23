    
    
    
const {readFileSync, writeFileSync} = require('fs')

const path = require('path')
const sentMail = require('../utility/sentMail')
const sendMessage = require('../utility/sentSMSB')
const getOTP = require('../utility/sentOTP')


// ==========================> show index  <==========================



    const showIndex = ( req, res) => {

        const students =JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

        const verified = students.filter(data => data.isVerified == true)
    
        res.render('student/index',{

            students : verified
        })

    }





    // |====================> unverified student  <====================|




    const unverifiedStudent = ( req, res) => {

        const students =JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

        const unverified = students.filter(data => data.isVerified == false)
    
        res.render('student/unverified',{

             students : unverified
        })

    }




    // =====================>     verifyAccount <===========================




    const verifyAccount = (req,res) => {

        const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))


        const token = req.params.token;


      


        students[ students.findIndex(data => data.token == token) ] ={

        ...students [ students.findIndex(data => data.token == token) ],
            isVerified : true,

            token : ''
    }
    writeFileSync(path.join(__dirname,'../db/student/student.json'),JSON.stringify(students))

    res.render('student/isVerified',{

        isVerified : students[ students.findIndex(data => data.token == token) ] . isVerified
    })



    }





    // ===============>     create page   <===========================||


    const showCreatePage = ( req, res ) => {


    res.render('student/create')

    }


    //=====================> post create <=========================||

    const showCreatePost = async (req, res) => {

        const students =JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

        const {name,photo,cell,email,location} = req.body;

      
         
        let last_id = Date.now() + '_' + Math.floor(Math.random() * 10000)

        const OTP = getOTP()

       

        const token = Date.now() + '_' + Math.floor(Math.random() * 100000)
        
        students.push({

            id : last_id,
            name : name,
            cell : cell,
            email : email,
            location : location,
            photo:req.file?req.file.filename:'avater.png',
            token : token,
            isVerified : false,
            OTP : OTP




        })

        // sent email



        await sentMail(email,'verify account',{
            name,email,token,cell
        });



       

        writeFileSync(path.join(__dirname,'../db/student/student.json'),JSON.stringify(students))

        
        
       

        res.render('student/createVerify',{

            name,
            last_id
        })

    }


    
        // --------------------> student delete <============================|


        const showDeletePage = (req,res) => {

            const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

            const {id} = req.params

                const newStudents = students.filter(data => data.id != id)

                writeFileSync(path.join(__dirname,'../db/student/student.json'),JSON.stringify(newStudents))


                res.redirect('/student')


        }


        // -------------------->     show single view     <-----------------------------


        const showSinglePage = (req, res ) => {

            const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student/student.json')))

             const {id } = req.params;

             const viewStudent = students.find( data => data.id == id)

             

             res.render('student/view',{
                viewStudent
             })

        }

//  ========================> edit page  <==============================



const showEditPage = ( req, res ) => {

    const students = JSON.parse( readFileSync(path.join(__dirname,'../db/student/student.json')) )

    const {id} = req.params;

    const editStudent = students.find( data => data.id == id)

    console.log(editStudent);


    res.render('student/edit',{
        editStudent
    })

}


    // ====================== Update page ===================||

    const showUpdatePage = (req, res) => {

        const {id} = req.params

        // student data

        const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

        students[ students.findIndex(data => data.id == id) ] ={

        ...students [ students.findIndex(data => data.id == id) ],

        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
        location : req.body.location
    }
    writeFileSync(path.join(__dirname,'../db/student/student.json'),JSON.stringify(students))

    res.redirect('back')

    }




    // ==================>  sms verification <===========



    const smsVerify = async (req,res) => {

        const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))


        const data = students.find(data => data.id == req.params.id)

        
        await sendMessage(data.cell,`Hi ${data.name} you OTP code is: ${data.OTP}`)

        res.render('student/sms-verify',{
            name : data.name,
            id : data.id
        })



    }



    // ================== sms Verify Done  <=================



    const smsVerifyDone = (req,res) => {

       const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))


    //     students[students.findIndex( data => data.OTP == req.body.OTP)]={
    //     ...students[students.findIndex( data => data.OTP == req.body.OTP)],
    
    //         isVerified : true,

    //         OTP : ''
    
    
    // }

    const index = students.findIndex( data => data.OTP == req.body.OTP)

    students[index] = {

        ...students[index],

        isVerified : true,

        OTP : ''
    }


    writeFileSync(path.join(__dirname, '../db/student/student.json'),JSON.stringify(students))


    res.render('student/isVerified',{

        isVerified: students[index].isVerified

    })


    }



    // export

    module.exports = {
    showIndex,
    showCreatePage,
    showCreatePost,
    showDeletePage,
    showSinglePage,
    showEditPage,
    showUpdatePage,
    unverifiedStudent,
    sentMail,
    verifyAccount,
    smsVerify,
    smsVerifyDone
    }