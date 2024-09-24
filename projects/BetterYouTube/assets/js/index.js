const form = document.forms.getLink;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.yt_link.value;

    if (!(input.includes('youtube.com') || input.includes('youtu.be'))) {
        document.querySelector('.error').innerHTML = '<p style="color: red;">Invalid link, try again!</p>';

        setTimeout(() => {
            document.querySelector('.error').innerHTML = '';
        }, 3000);

        return;
    }

    let link;

    if (input.includes('&list=')) {
        link = "https://www.youtube-nocookie.com/embed?listType=playlist&list=" + input.split('list=')[1] + "&autoplay=1";
    } else if (input.includes('youtube.com')) {
        link = "https://www.youtube-nocookie.com/embed/" + input.split('v=')[1].split('&')[0] + "?autoplay=1";
    } else {
        link = "https://www.youtube-nocookie.com/embed/" + input.split('/').pop() + "?autoplay=1";
    }

    const iframe = `<iframe class="rounded yt-iframe" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerpolicy="no-referrer" allowfullscreen></iframe>`;

    document.querySelector('.player').innerHTML = iframe;

    form.yt_link.value = '';
});

document.addEventListener('fullscreenchange', (e) => {
    if (document.fullscreenElement) {
        document.querySelector('.yt-iframe').classList.remove('rounded');
    } else {
        document.querySelector('.yt-iframe').classList.add('rounded');
    }
});