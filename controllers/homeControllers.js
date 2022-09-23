const {readFileSync, writeFileSync} = require('fs');
const path = require('path')




const showHomePage = ( req,res) => {

    const students =JSON.parse(readFileSync(path.join(__dirname,'../db/student/student.json')))

    const verified = students.filter(data => data.isVerified == true)

    res.render('student/index',{

        students : verified
    })

    
}



// export 


module.exports = showHomePage;