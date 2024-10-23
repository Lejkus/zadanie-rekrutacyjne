// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.

imageUpload_Btn = document.getElementById('imageUpload');
convertGrayscale_Btn = document.getElementById('convertGrayscale');
uploadedImage = document.getElementById('uploadedImage');
grayscaleCanvas = document.getElementById('grayscaleImage');

// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskzówka: Możesz użyć    , aby odczytać plik jako URL danych.

imageUpload_Btn.addEventListener('change',UploadImage)

function UploadImage(event) {
    const file = event.target.files[0]
    if(file){
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file); 
        if(grayscaleCanvas){
            const ctx = grayscaleCanvas.getContext('2d');
            ctx.clearRect(0, 0,grayscaleCanvas.width, grayscaleCanvas.height);
            ctx.canvas.width  = 302;
            ctx.canvas.height = 152;

        }
        
    }
}

//**------szczerze nie wiem czym rózni się zadanie 3 od zadanie 4,5, w 3 jest "i pokaż go w elemencie <canvas>" a w 4 jest "Narysuj przesłany obraz na canvasie", nie wiem moze to inna metoda ale ja nie czaje :((  /

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.


convertGrayscale_Btn.addEventListener('click', ()=>{

    if(!uploadedImage.src){
        alert('nie dobrze koleszko, dodaj zdjecie')
        return
    }

    const ctx = grayscaleCanvas.getContext('2d');
    grayscaleCanvas.width = uploadedImage.width;
    grayscaleCanvas.height = uploadedImage.height;

    ctx.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);

    const imageData = ctx.getImageData(0, 0, uploadedImage.width, uploadedImage.height);
    
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        //to je przypisywanie koloruf
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        
        //to je skala szarosci
        const gray = (r + g + b) / 3; 

        //to je zmiana
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      
    ctx.putImageData(imageData,0,0)

});
    



// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danym i pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.