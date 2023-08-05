const qrForm = document.getElementById('qrForm');
const linkInput = document.getElementById('link');
const qrDiv = document.getElementById('qrDiv');
const validation = document.querySelector('.validation');

qrForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const linkValue = linkInput.value.trim();
    if (linkValue) {
        validation.classList.add('display');
        try {
            const response = await fetch(' https://infoajara.com/api/v1/generate', {
                method: 'POST',
                body: JSON.stringify({link: linkValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json()
            console.log(data)
                qrDiv.innerHTML = `
                <div class="d-flex flex-column p-5 gap-3">
                    <a href="${data.data}" download="qr_img.svg">
                        <img src="${data.data}" alt="qr-code" />
                    </a>
                    <button id='downloadBtn'>Download</button>
                </div>
                `
                
        } catch (error) {
            console.error(error);
        }
    } else {
        validation.classList.remove('display');
    }
});

