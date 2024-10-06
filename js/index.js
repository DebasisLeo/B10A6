function petsCategory() {
 spin();
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories);
    })
    .catch(err => {
      console.error(err);
    });
}

function spin() {
  const spinner = document.getElementById('spinner');
  document.getElementById('Main').classList.add('hidden')
  spinner.style.display = 'block'; 

  setTimeout(function () {
    spinner.style.display = 'none';
    document.getElementById('Main').classList.remove('hidden')
    
  }, 2000);
}


function openModalWithCountdown(duration = 3, button) {
  const countdownElement = document.getElementById('countdown');
  let countdownValue = duration;

 
  document.getElementById('countdownModal').showModal();
  
  
  button.setAttribute('disabled', true);


 
  countdownElement.textContent = countdownValue;

  const intervalId = setInterval(() => {
    countdownValue -= 1;
    countdownElement.textContent = countdownValue;

    
    if (countdownValue <= 0) {
      closeModal(); 
      clearInterval(intervalId); 
      button.setAttribute('disabled', true); 
     
    }
  }, 1000);
}


function closeModal() {
  document.getElementById('countdownModal').close();
}




function displayCategories(pets) {
  const s3 = document.getElementById('s-3');
  s3.innerHTML = ''; 
  pets.forEach(pet => {
    s3.innerHTML += `
      <div>
        <button ondblclick="spin()" onclick="btnpet('${pet.category}')" class="btn px-10 rounded-lg border">
          ${pet.category}s <img class="h-10" src=${pet.category_icon} alt="">
        </button>
      </div>
    `;
  });
}
function btnpet(petname) {
  spin(); 
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${petname}`)
    .then(res => res.json())
    .then(data => sortbtn(data.data));
}
function allPetsCategory() {
  spin(); 
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
      displayAllPets(data.pets);
    })
    .catch(err => {
      console.error(err);
    });
}

function displayAllPets(pets) {
  const d1 = document.getElementById('d-1');
  d1.innerHTML=""
  if (pets.length==0) {
    document.getElementById('d-1').classList.remove('grid');
    d1.innerHTML=`
    <div class="flex justify-center mt-10 mb-5"> <img src="./images/error.webp" alt=""></div>
<p class="text-center mb-5">No information Available</p>
<p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
its layout. The point of using Lorem Ipsum is that it has a.</p>
    
    
    `
    return
  }

  else
  {
    document.getElementById('d-1').classList.add('grid');
  }
  pets.forEach((pet, index) => {
      d1.innerHTML += `
      <div class="px-5 py-5 bg-base-100 shadow-xl">
          <figure class="">
            <img src=${pet.image} alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="mt-5 ">
              <p>${pet.pet_name}</p>
              <p><i class="fa-solid fa-bread-slice"></i> Breed: ${(pet.breed == null || pet.breed == undefined) ? 'Not Available' : pet.breed}</p>
              <p><i class="fa-solid fa-cake-candles"></i> Birth: ${(pet.date_of_birth == null || pet.date_of_birth == undefined) ? 'Not Available' : pet.date_of_birth}</p>
              <p><i class="fa-solid fa-mercury"></i> Gender: ${(pet.gender == null || pet.gender == undefined) ? 'Not Available' : pet.gender}</p>
              <p><i class="fa-solid fa-dollar-sign"></i> Price: ${(pet.price == null || pet.price == undefined) ? 'Not Available' : pet.price}$</p>
              <div class="divider"></div>
              <div class="flex justify-between">
                  <button onclick="Like(${index})" class="btn "><i class="fa-regular fa-thumbs-up"></i></button>
                  <button id="adopt" onclick="openModalWithCountdown(3,this)" class="btn">Adopt</button>
                  <button onclick="Details(${index})" class="btn">Details</button>
              </div>
          </div>
      </div>
      `;
  });
}
function Details(index)
{
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res => res.json())
  .then(data => displayDetails(data.pets[index]));
}
function displayDetails(pet)
{
  const box=document.getElementById('box');
  box.innerHTML=`
  <img class="w-full" src=${pet.image} alt="">
  <p class="mt-5">${pet.pet_name}</p>
  <div class="flex gap-9 mb-5">
  <div>
  <p><i class="fa-solid fa-bread-slice"></i> Breed: ${(pet.breed == null || pet.breed == undefined) ? 'Not Available' : pet.breed}</p>
  <p><i class="fa-solid fa-mercury"></i> Gender: ${(pet.gender == null || pet.gender == undefined) ? 'Not Available' : pet.gender}</p>
  <p><i class="fa-solid fa-bread-slice"></i> Vaccinated Status: ${(pet.vaccinated_status == null || pet.vaccinated_status == undefined) ? 'Not Available' : pet.vaccinated_status}</p> 
  </div>
  
  <div>
  <p><i class="fa-solid fa-cake-candles"></i> Birth: ${(pet.date_of_birth == null || pet.date_of_birth == undefined) ? 'Not Available' : pet.date_of_birth}</p>
              
              <p><i class="fa-solid fa-dollar-sign"></i> Price: ${(pet.price == null || pet.price == undefined) ? 'Not Available' : pet.price}$</p>
  </div>
  
  
  </div>
  
  <div class="divider mb-5"></div>
<p class="mb-5">Details Information</p>
<p>${pet.pet_details}</p>



<div class="modal-action ">
<form method="dialog" class="w-full">
 <div> 
 <button class="btn w-full">Cancel</button></div>
</form>
</div>


 
  
  `

  document.getElementById('mymodal').showModal();
}

function Like(index) {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res => res.json())
  .then(data => displayLike(data.pets[index]));
}

function displayLike(pets) {
  console.log(pets);
  const d2 = document.getElementById('d-2');
  
  d2.innerHTML += `
  <div class="p-3 border  "><img class="h-full  rounded-lg w-full object-cover" src=${pets.image} alt=""></div>
  `;
}
function sortbtn(pets)
{
pets.sort((a,b)=>{
  return b.price-a.price
})
displayAllPets(pets)

}



document.getElementById('sort').addEventListener('click', (e) => {
  spin(); 
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => sortbtn(data.pets));
});
petsCategory();
allPetsCategory();
 