let enderecoBase = "";

//1 - Ouvir o evento qunado o usuario sair do campo "cep":
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepInformado = elemento.value;

//2 - Validar o CEP
    if(!(cepInformado.length === 8))
        return;

//3 - Fazer a busca no viaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(Response => Response.json())
    .then(data => {
    //Processamento da pagina
        if(!data.error){
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;

            enderecoBase = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

            document.getElementById("camposExtras").classList.remove("hidden");


        }else{
            alert("Cep não encontrado!")
        }
    })
         .catch(error => console.error("Errro em encontrar o Cep ", error));

    });


    //Criar a imagem do mapa!
document.getElementById("pesquisar").addEventListener("click", () => {
    const numeroCasa = document.getElementById("numero").value;

    if (numeroCasa.trim() === "") return;

    const enderecoCompleto = `${enderecoBase}, ${numeroCasa}`;

    const mapaHTML = `
        <iframe 
            width="100%" 
            height="300" 
            style="border:0;" 
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&output=embed">
        </iframe>
    `;

    document.getElementById("mapa").innerHTML = mapaHTML;

    document.getElementById("camposExtras").scrollIntoView({ behavior: "smooth" });

});

const campos = ["cep", "logradouro", "bairro", "cidade", "estado", "numero"]
    campos.forEach(id => {
        const elemento = document.getElementById(id);
        elemento.value = localStorage.getItem(id) || "";
        elemento.addEventListener("input", () => {
            localStorage.setItem(id, elemento.value);
        });
    });