
document.addEventListener("DOMContentLoaded", function(){

	let allCities = []
	let favCities = []
	let favCitiesId = 0

	const citySearch = document.getElementById("city-seach-input")

	// const select = document.getElementById("select")

	let states = CITIES.map(function(city){
		return city.state
	})

	select_box(states)


	const cityContainer = document.getElementById("city-container")

	document.addEventListener("keyup", function(event){

		searchString = event.target.value
		let regex = new RegExp(searchString, "i");

		if(!searchString){
			cityContainer.innerHTML = ""
			return
		}

		allCities = CITIES.filter(function(city){
			return city.name.match(regex) 
		})
		

		const filteredTemplate = allCities.map(renderHtml).join("")
		// debugger
		cityContainer.innerHTML = filteredTemplate

	})

	cityContainer.addEventListener("mouseover", () => {
		
		if(event.target.className === "city-name"){
			// console.time("mouseover")

			let idx = parseInt(event.target.id)
			// console.log(idx)

			const currentCity = allCities[idx]
			// debugger
			event.target.innerText = currentCity.name + ', ' + currentCity._id + ': Population- ' + currentCity.pop
			// console.timeEnd("mouseover")
		}

		// for (let i = 0; i < CITIES.length; i++) {


		// 	if (event.target.innerText === CITIES[i].name) {
		// 		event.target.innerText = CITIES[i].name + ': Population- ' + CITIES[i].pop
		// 		break
		// 	}
		// }
	})

	cityContainer.addEventListener("mouseout", () => {
		
		if(event.target.className === "city-name"){
			// console.time("mouseover")

			let idx = parseInt(event.target.id)

			const currentCity = allCities[idx]
			// debugger
			event.target.innerText = currentCity.name + ', ' + currentCity._id

			// console.timeEnd("mouseout")
		}


		// 	if (event.target.innerText === CITIES[i].name + ': Population- ' + CITIES[i].pop){
		// 		event.target.innerText = CITIES[i].name
		// 		break
		// 	}
			
		// }
		
	})

	cityContainer.addEventListener("click", () =>{
		
		//get the id from allcities
		let idFromAllCitiesArray = parseInt(event.target.id)

		//grab the name 
		let favCityName = allCities[idFromAllCitiesArray].name
		let favCityZip = allCities[idFromAllCitiesArray]._id
		let favCityPop = allCities[idFromAllCitiesArray].pop
		
		//shovel the name into the new array
		favCities.push(createFavCities(favCityName, favCityZip, favCityPop))
		
		favCities = removeDuplicates(favCities, "zip")
		debugger
		event.target.innerText = favCityName + ', ' + favCityZip + ': Population- ' + favCityPop + ' Added To Favorite Cities'

	})

	function createFavCities(city, zipCode, population){
		return {
			id: ++favCitiesId,
			name: city,
			zip: zipCode,
			pop: population
		}
	}
	


})

//remove duplicates for "add to favorite list click"
function removeDuplicates(arrWithDups, keyToRemoveBy) {
     let newArr = []
     let lookupObject  = {}

     for(let i in arrWithDups) {
        lookupObject[arrWithDups[i][keyToRemoveBy]] = arrWithDups[i]
     }

     for(i in lookupObject) {
         newArr.push(lookupObject[i])
     }
      // debugger
     return newArr
 }

function renderHtml(city, index){
	return `<div class="" id="">
   				<p class="city-name" id="${index}">${city.name}, ${city._id}</p>
   					</div>
     					<p class="center-text pop-popup" data-cityname="${city._id}" data-action="pop-popup"></p>
      				</div>
			</div>`
}



function select_box(stateList){

	//populate select drpdown box with state names sorted albhabetically, and without duplicates

	//remove duplicates
	stateList = stateList.filter(function(v,i) { return stateList.indexOf(v) == i; }).sort()

	//populate
	let sel = document.getElementById('select')

	for(let i = 0; i < stateList.length; i++) {
    	// let opt = document.getElementById('option');
    	let opt = document.createElement('option')
    	opt.innerHTML = stateList[i]
    	opt.value = stateList[i]
    	sel.appendChild(opt)
    	// console.log(opt.value)
	}
	// let x = sel.selectedIndex
 	// console.log(document.getElementsByTagName("option")[x].value)
	
}














