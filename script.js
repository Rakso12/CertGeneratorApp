window.jsPDF = window.jspdf.jsPDF;

function generateCertificate(img, text) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = "#21598c";
  ctx.font = "italic 160px Lato";
  ctx.textAlign = "center";

  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 200, canvas.width);
}

window.addEventListener("DOMContentLoaded", async () => {
  const imageInput = document.getElementById("image-input");
  const generateBtn = document.getElementById("generate-btn");
  const inputXlsx = document.getElementById("excel-input");

  let person = [];

  let index = -1;

  inputXlsx.addEventListener("change", async () => {
    const json = await readXlsxFile(inputXlsx.files[0]);
    person = json.map(([firstName, lastName]) => `${firstName} ${lastName}`);
  });

  generateBtn.addEventListener("click", () => {
    if (++index >= person.length) {
      return;
    }

    const reader = new FileReader();
    var pdf = new jsPDF({
      orientation: "l",
    });

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = async () => {
        generateCertificate(img, person[index]);
        pdf.addImage(
          canvas,
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
          "NONE"
        );
        await pdf.save(person[index] + ".pdf");
      };
    };

    reader.readAsDataURL(imageInput.files[0]);
  });
});
