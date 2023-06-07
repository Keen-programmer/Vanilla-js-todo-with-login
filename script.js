const registerUsername= document.getElementById("username");
const registerPassword = document.getElementById("password");
const email = document.getElementById("email");
const error = document.getElementById("error");
const btn = document.getElementById("btn");
const registerPage = document.getElementById("register-page");
const loginPage= document.getElementById("loginPage");




btn.onclick = (e) =>{
	e.preventDefault();
	validateInput();
}

let validateInput = () => {
	if (registerUsername.value.trim() ==="" || registerPassword.value.trim() ==="") {
		error.innerHTML = "Fill out all fields before registering..";
} else {
	handleInput();

	error.style ="display:none";
    }
    registerUsername.value ="";
	registerPassword.value ="";
}

let userInfo = [ ]

let handleInput = () => {
		 userInfo.push({
		username: registerUsername.value,
		email: email.value,
		password: registerPassword.value,
      },
       {
       	username: "guest", 
           password: "123"
     })
      
localStorage.setItem ("userDetails", JSON.stringify(userInfo));
alert("Successfully registered, proceed to login now")
loginTab()
}

function loginTab () {
	registerPage.style = "display:none";
	loginPage.innerHTML = `
	        <form class="form">
				<h2>Log in to your account </h2>
				  <p style= "color: #083358" >Don't have an account? sign up here</p>
				<hr class ="hr">
				<label for ="username">
					<input type ="text" id="loginUsername" placeholder="Enter username" class ="input"/>
				</label><br>
				
                <label for ="password">
                	<input type="password" id="loginPassword" placeholder="Choose a password" class ="input" />
                </label><br>
                <p id = "loginError" style= "color: #fc3c3c" ></p>
                <button id="btnLogin" class ="btn">Login </button>
            </form>
                    						 `
const btnLogin = document.getElementById("btnLogin");
const loginUsername= document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
btnLogin.onclick = (e) => {
	e.preventDefault();
	validateLogin();
      }
      //validating user login input 
      function validateLogin () {
      	if (loginUsername.value.trim() === "" || loginPassword.value.trim() ==="" ){
      	         loginError.innerHTML = "Please fill up all input";
                   } else  { handleLogin() }
           }
            
              function handleLogin () {
                  for (let x in userInfo ){
              	if ( loginUsername.value == userInfo[x].username && loginPassword.value == userInfo[ x ].password ) {
              	loginUsername.value =" ";
                  loginPassword.value =" ";
              	alert ("Logged in; you'll be redirected to your profile now");
                    notesPage();
                     } else { loginError.innerHTML = "Login details are incorrect, please input again";}
                     }
               }
}
let noteList = [ ];
function notesPage() {
	
	loginPage.style ="display: none";
	const notehtml= document.getElementById("notes-page");
	notehtml.style="display: block";
	const inputSection= document.getElementById("input-section");
	
	inputSection.innerHTML = ` 
	<h5 id="welcome-text">Welcome to your private notes ${userInfo[0].username }</h5>
          <form id ="notes-form">
        	<label for="input-note">
        	  <textarea type ="text" id="input-note"></textarea>
           </label>
           
            <div class="input-control">
                  <button id="btnAddNote">Add note</button>
                  
                  <label for="user-cat"> Category 
                <select name="category" id="user-cat">
        				<option value="uncategorized">Uncategorized</option>
      				  <option value="work">Work</option>
   				     <option value="personal">Personal</option>
    				    <option value="family-affait">Family affairs </option>
  				      <option value="study">Study</option>
 		     </select>
          </div>
      </form>
      <hr>
        <h2 style = "background: white">Your notes</h2>
        <hr>
													`
													
	
	const textAreaInput= document.getElementById("input-note");
	const  btnAddNote  = document.getElementById("btnAddNote");
	
	btnAddNote.addEventListener ("click",  (e) => {
		e.preventDefault();
		validateTextArea();
         })
        const validateTextArea = () => {
        	if (textAreaInput.value.trim()  ===""){
        	alert("input cannot be empty");
                  } else { 
                          handleTextArea()
               		textAreaInput.value ="";	 }
          }
          
          const handleTextArea = () => {
          noteList.push({
          	text: textAreaInput.value
          })
          localStorage.setItem("notes", JSON.stringify(noteList));
          renderNotes();
          console.log(noteList)
          }
          
     
	// notes display section 
		const renderNotes = () => {
			let html = "";
			const notesRender = document.getElementById("notes-render");
			notesRender.style = "display: block";
			const notesContainer = document.getElementById("notes-container")
			let noteObj = localStorage.getItem("notes");
			let items = JSON.parse(noteObj);
			
			if (!items){
				notesContainer.innerHTML= "No notes yet, add new notes";
				console.log("no notes");
            }
			
			for (let item in items){
				html += `
				<div id ="notes-section">
 	   <h4 id ="display-category" class="display-category">Coding</h4>
        <h4 id="display-text">${items[item].text}</h4>
        <h5 id="displayDate">29/05/2022 at 2:02 </h5>
         <div style="display:flex;">
        <button class="controlBtn">Edit</button> 
        <button class="controlBtn" style="margin-left: 3px;">Delete</button></div>
    </div> `
         }
	notesContainer.innerHTML = html; 
        }
         
}


