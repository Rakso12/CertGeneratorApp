window.jsPDF = window.jspdf.jsPDF

function generateCertificate(img, text) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = img.width;
    canvas.height = img.height;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  
    ctx.fillStyle = '#21598c';
    ctx.font = "italic 160px Lato";
    ctx.textAlign = 'center';

    ctx.fillText(text, canvas.width / 2, canvas.height/2 + 200, canvas.width);
}
  
window.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text');
    const imageInput = document.getElementById('image-input');
    const generateBtn = document.getElementById('generate-btn');

    textInput.value = 'Adam Nowak';

    generateBtn.addEventListener('click', () => {
        const reader = new FileReader();
        var pdf = new jsPDF({
            orientation: 'l',
        });

                

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                let inputXlsx = document.getElementById('excel-input');

                async function myFunc() {
                    json = await readXlsxFile(inputXlsx.files[0])
                    person = json.map(([firstName, lastName]) => `${firstName} ${lastName}`);
                    
                    person.forEach(async (element) => {
                        console.log(element);
                        generateCertificate(img, element);
                        pdf.addImage(canvas, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'NONE');        
                        await pdf.save(element +'.pdf');
                        console.log(pdf.save);
                    });
                };

                myFunc(); 
            };
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
});
