function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', function() {
    const boundingBox = document.getElementById('box-o-circles');
    const mainText = document.getElementById('startText');
    const circle = document.getElementById('circle');
    const counter = document.getElementById('count');
    let hits = 0;
    let total = 0;

    function handleCircle() {
        let newCircle = circle.cloneNode()

        mainText.style.display = 'none'

        boundingBox.appendChild(newCircle);

        const boundingBoxRect = boundingBox.getBoundingClientRect();
        const boxWidth = boundingBoxRect.width;
        const boxHeight = boundingBoxRect.height;


        const randomX = Math.random() * (90 - 5) + 5;
        const randomY = Math.random() * (90 - 5) + 5;            

        newCircle.style.left = `${randomX}%`;
        newCircle.style.top = `${randomY}%`;
        newCircle.style.display = 'block'

        newCircle.addEventListener('click', function() {
            hits = hits + 1
            newCircle.remove()
        })

        return true
    }


    async function start() {
        for (let i = 1; i > 0; i--) {
            mainText.innerText = i.toString();
            await sleep(1000)
        }


        mainText.style.display = 'none';
        counter.style.display = 'block';


        while (true) {
            handleCircle()
            total = total + 1;
            counter.innerText = `Count ${hits}/${total}`
            await sleep(1000)
        }
    }

    const textListener = function() {
        start();
        mainText.removeEventListener('click', textListener);
    };

    const boxListener = function() {
        start();
        boundingBox.removeEventListener('click', boxListener);
    };

    mainText.addEventListener('click', textListener);
    boundingBox.addEventListener('click', boxListener);

});
