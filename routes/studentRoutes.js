
// =============> require section <================

const express = require('express')
const { 
        showIndex,
        showCreatePage,
        showCreatePost,
        showDeletePage,
        showSinglePage,
        showEditPage,
        showUpdatePage,
        unverifiedStudent,
        verifyAccount,
        smsVerify,
        smsVerifyDone

     } = require('../controllers/studentControllers')



const multer = require('multer')

const path = require('path')

// init router

const router = express.Router()

// mullter

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../public/images/student-image/')
            
            
         )
    },
    
    filename : (req,file,cb) => {
        cb(null,file.originalname)
    }
})


const studentPhotoMulter = multer({
    storage : storage
}).single('student-photo')

// route

router.get('/',showIndex);
router.get('/unverified',unverifiedStudent);
router.get('/verified/:token',verifyAccount)

router.get('/create',showCreatePage)
router.post('/create',studentPhotoMulter,showCreatePost)
router.get('/delete/:id',showDeletePage)
router.get('/view/:id',showSinglePage)
router.get('/edit/:id',showEditPage)
router.post('/update/:id',studentPhotoMulter,showUpdatePage)

router.get('/sms-verify/:id',smsVerify)
router.post('/sms-verify/:id',smsVerifyDone)


// export

module.exports=router

