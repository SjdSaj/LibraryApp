// document.getElementById('sigBtn').addEventListener('click',()=>{
//     alert('Signup Successfull');
//     window.location.href = "/login";
    
// });


// Email validation
{
    // email validation event listner

var email = document.getElementById('email');
var emailMsg = document.getElementById('emailMsg');

email.addEventListener('focus', () => {

    emailMsg.style.display = 'block';
    
    email.addEventListener('input', () => {

        ValidateEmail();
        email.addEventListener('focusout', () => {
            emailMsg.style.display = 'none'
        })
    })
})



// Email validation Function
function ValidateEmail() {
    var email = document.getElementById('email');
    var emailMsg = document.getElementById('emailMsg');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        emailMsg.classList.remove('wrong');
        emailMsg.classList.add("success");


        return true;
    }
    else {
        emailMsg.classList.remove('success');
        emailMsg.classList.add('wrong');

        return false;

    }

}
}



// Password validation Function
{

    // password validation event listners
    var pswd = document.getElementById('pswd');

    pswd.addEventListener('focus',()=>{
        pswdText.style.display = 'block';
        pswdMsg.style.display = 'block';
        pswd.addEventListener('input', () => {

            pswdText.style.display = "block";
            pswdMsg.style.display = 'block';
    
            ValidatePswd();
    
            pswd.addEventListener('focusout', () => {
                pswdText.style.display = "none"
                pswdMsg.style.display = 'none';
            })
        })
    })
    

    function ValidatePswd() {
        var pswdMsg = document.getElementById('pswdMsg');
        var pswdText = document.getElementById('pswdText');
        var pswdClass = document.getElementsByClassName('pswdClass');


        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (pswd.value.length < 8) {
            pswdClass[2].style.color = 'grey'

            pswdMsg.classList.remove('warning');
            pswdMsg.classList.remove('success');
            pswdMsg.classList.add('wrong');

            {
                pswdClass[0].style.color = 'grey';
                pswdClass[1].style.color = 'grey';
                pswdClass[2].style.color = 'grey';
                pswdClass[3].style.color = 'grey';
                // for uppercase varification
                if (pswd.value.match('(?=.*[A-Z])')) {

                    pswdClass[1].style.color = '#00FF00';


                }
                // for lowercase varification
                if (pswd.value.match('(?=.*[a-z])')) {

                    pswdClass[0].style.color = '#00FF00';

                }
                // for Symbol varification
                if (pswd.value.match('(?=.*[!@#\$%\^&\*])')) {


                    pswdClass[3].style.color = '#00FF00';

                }
            }



        } else if (pswd.value.length >= 8 && pswd.value.length < 10) {
            pswdClass[2].style.color = '#00FF00';

            pswdMsg.classList.remove('wrong');
            pswdMsg.classList.remove('success');
            pswdMsg.classList.add('warning');

            {
                pswdClass[0].style.color = 'grey';
                pswdClass[1].style.color = 'grey';
                pswdClass[3].style.color = 'grey';
                // for uppercase varification
                if (pswd.value.match('(?=.*[A-Z])')) {

                    pswdClass[1].style.color = '#00FF00';


                }
                // for lowercase varification
                if (pswd.value.match('(?=.*[a-z])')) {

                    pswdClass[0].style.color = '#00FF00';

                }
                // for Symbol varification
                if (pswd.value.match('(?=.*[!@#\$%\^&\*])')) {


                    pswdClass[3].style.color = '#00FF00';

                }
            }

        } else if (pswd.value.length > 10) {
            pswdClass[2].style.color = '#00FF00';
            pswdMsg.classList.remove('wrong');
            pswdMsg.classList.remove('warning');
            pswdMsg.classList.add('success');

            {
                pswdClass[0].style.color = 'grey';
                pswdClass[1].style.color = 'grey';
                pswdClass[3].style.color = 'grey';
                // for uppercase varification
                if (pswd.value.match('(?=.*[A-Z])')) {

                    pswdClass[1].style.color = '#00FF00';


                }
                // for lowercase varification
                if (pswd.value.match('(?=.*[a-z])')) {

                    pswdClass[0].style.color = '#00FF00';

                }
                // for Symbol varification
                if (pswd.value.match('(?=.*[!@#\$%\^&\*])')) {


                    pswdClass[3].style.color = '#00FF00';

                }
            }

        }
        if (pswd.value.match('(?=.*[a-z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{8,})')) {
            return true;
        }
        else {

            return false;
        }


    }
}

// Password matching
{
    var pswdMatch = document.getElementById('pswdMatch');
    var pswdMatchMsg = document.getElementById('pswdMatchMsg');
    
    pswdMatch.addEventListener('focus',()=>{
        
        pswdMatchMsg.style.display = 'block';
        pswdMatch.addEventListener('input',()=>{
            passwordMatch();

            pswdMatch.addEventListener('focusout',()=>{

                pswdMatchMsg.style.display = 'none';
                
            });
    
        });
        
    });

    

    function passwordMatch(){
        if(pswd.value===pswdMatch.value){
            pswdMatchMsg.classList.remove('wrong');
            pswdMatchMsg.classList.add('success');
            return true;
        }else{
            pswdMatchMsg.classList.remove('success');
            pswdMatchMsg.classList.add('wrong');
            return false;
        }
    }
}

// submittion
function formSubmit(event){
    if(ValidateEmail()&&ValidatePswd()&&passwordMatch()){
        
        var nm = document.getElementById('name').value;
        var adrs = document.getElementById('adrs').value;
        var adrs2 = document.getElementById('adrs2').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var zip = document.getElementById('zip').value;

        if(nm===''||adrs===''||adrs2===''||city===''||state===''||zip===''){
            alert('Fill all the details ')
            pswdText.style.display = 'block';
            pswdMsg.style.display = 'block';
            emailMsg.style.display = 'block';
            pswdMatchMsg.style.display = 'block';
            event.preventDefault();
        }else{
            
            alert('signup successfull');
            
        }
    }else{
        alert('Fill all the details  !')
        pswdText.style.display = 'block';
        pswdMsg.style.display = 'block';
        emailMsg.style.display = 'block';
        pswdMatchMsg.style.display = 'block';
        event.preventDefault();
    }
}