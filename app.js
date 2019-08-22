const input = document.querySelector('input');
const ul = document.querySelector('ul');
const divCount = document.getElementById('count');

input.addEventListener('keypress', e => {
	if(e.key === 'Enter') {
		onClick();
	}
});

async function onClick() {
	const query = input.value;

	if(!query) {
		return alert('Please enter a search query');
	}

	ul.innerHTML = '';
	count.textContent = '';

	const queryResponse = await fetch(`https://api.github.com/search/users?q=${query}`);
	//console.log(queryResponse);

	if(queryResponse.ok) {
		const searchResults = await queryResponse.json();
		//console.log(body);
		count.textContent = `Count: ${searchResults.items.length}`;

		searchResults.items.forEach(async item => {
			console.log(item);
			let userResponse = await fetch(item.url);
			let user = await userResponse.json();
			console.log(user);

			let li = document.createElement('li');

			let img = document.createElement('img');
			img.src = item.avatar_url;
			img.width = 60;
			img.height = 60;
			li.appendChild(img);

			// description
			// star/follower count

			let span = document.createElement('span');
			span.textContent = user.name;
			li.appendChild(span);

			let a = document.createElement('a');
			a.style = 'display: block;';
			a.href = item.html_url;
			a.textContent = item.login;
			span.appendChild(a);


			ul.appendChild(li)
		});
	}
}