const signedInSection = document.querySelector('#signedIn');
const signedOutSection = document.querySelector('#notSignedIn');
const paragraph = document.querySelector('#custom-text');

const signInBtn = document.querySelector('#signin');
const signOutBtn = document.querySelector('#signout');
const submitButton = document.querySelector('#createdata');
const displaySection = document.querySelector('#listdata');
const titleInput = document.querySelector('#todotitle');
const descriptionInput = document.querySelector('#tododes');
const topRightBtn = document.querySelector('.end');


const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.addEventListener('click',function(){
    auth.signInWithPopup(provider);
    console.log("sign in clicked");
});

signOutBtn.addEventListener('click',function(){
    auth.signOut();
    console.log("sign out clicked");
});

function del(parameter){
    console.log("del function");
    db.collection('todo')
    .where('Description','==',parameter)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
}


auth.onAuthStateChanged(user => {
    if (user){
        //When signed in
        signedInSection.style.display = "block";
        signedOutSection.style.display = "none";
        paragraph.innerText = `Hi ${user.displayName}, Welcome to your personal To-do 🙂`
        topRightBtn.innerText = `Hi ${user.displayName}`;
    }
    else{
        //When not signed in
        signedInSection.style.display = "none";
        signedOutSection.style.display = "block";
        topRightBtn.innerText = `SignIn`;

    }
});

const db = firebase.firestore();
let reference;
let unsubscribe;
let c=0;
let elementId = [];
elementId[0] = 0;
submitButton.addEventListener('click',console.log("worked"));
auth.onAuthStateChanged(user => {
    if (user){
        //When signed in
        reference = db.collection('todo');
        submitButton.addEventListener('click',function(){
            const { serverTimestamp } = firebase.firestore.FieldValue;

            reference.add({
                uid: user.uid,
                Title: titleInput.value,
                Description: descriptionInput.value,
                createdAt: serverTimestamp(),
            });

            titleInput.value = "";
            descriptionInput.value = "";

            console.log("Create Button Clicked");
        });



        unsubscribe = reference
                        .where('uid','==',user.uid)
                        .orderBy('createdAt')
                        .onSnapshot(querySnapshot =>{
                            const items = querySnapshot.docs.map(doc => {
                                c++;
                                return `
                                <tr>
                                <td class="left">${c}</td>
                                <td class="mid">${doc.data().Title}</td>
                                <td class="right">${doc.data().Description}</td>
                                <td><img src="./img/delete.svg" onclick="del('${doc.data().Description}')"></td>
                                </tr>
                                `
                            });
                            c=0;

                            displaySection.innerHTML= `
                            <tr>
                            <th class="left">Sr. No.</th>
                            <th class="mid">Title</th>
                            <th class="right">Description</th>
                            <th>Delete</th>
                            </tr>
                            ` + items.join('');
                            console.log("hi there");
                        });
    }else{
        unsubscribe && unsubscribe();
    }
});
