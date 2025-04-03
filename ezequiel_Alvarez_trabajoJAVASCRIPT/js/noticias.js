const containerNoticias = document.getElementById('container-noticias');

fetch('./assets/datos/noticias.json')
    .then(response => response.json())
    .then(data=>{
        data.noticias.map((noticia)=>{
            containerNoticias.innerHTML +=
            `
            <div class="tarjeta-noticia" style="background-image: url(${noticia.imagen});">
                    <a href="${noticia.url}" target="_blank"  class="link-noticia">
                        <div class="noticia">
                            <h3>${noticia.titulo}</h3>
                            <P>${noticia.noticia}</P>
                            <small>${noticia.fecha}</small>
                        </div>
                    </a>
                </div>
            `
        })
    })




    /**EJEMPLO EN HTML
     * 
     * <div class="tarjeta-noticia" style="background-image: url(./assets/images/recomendado/recomendado1.webp);">
                    <a href="https://cincodias.elpais.com/noticias/creacion-empresas/" target="_blank"  class="link-noticia">
                        <div class="noticia">
                            <h3>APERTURA</h3>
                            <P>El dia 03 de Marzo del 2025, ha inagurado la nueva empresa Alicantara..</P>
                            <small>03/03/2025</small>
                        </div>
                    </a>
                </div>
                <div class="tarjeta-noticia" style="background-image: url(./assets/images/recomendado/recomendado2.webp);">
                    <a href="https://elpais.com/noticias/ventas/" target="_blank"  class="link-noticia">
                        <div class="noticia">
                            <h3>VENTAS</h3>
                            <P>Avanzando en sus ventas, Alicantara se posiciona entre las 10 mejores empresas..</P>
                            <small>10/03/2025</small>
                        </div>
                    </a>
                </div>
                <div class="tarjeta-noticia" style="background-image: url(./assets/images/recomendado/recomendado3.jpg);">
                    <a href="https://www.muvit.es/blog/movil-y-accesorios/las-ultimas-tendencias-en-accesorios-moviles?srsltid=AfmBOoplcvcCGMmqEz3mWBWrZETWIXR45s6QPFH7oh2Ba5mTyMWCis3W" target="_blank"  class="link-noticia">
                        <div class="noticia">
                            <h3>MODA</h3>
                            <P>El jugador Lionel Messi utiliza fundas de Alicantara, ha sido furor y todos quieren la misma que él..</P>
                            <small>15/03/2025</small>
                        </div>
                    </a>
                </div>
                <div class="tarjeta-noticia" style="background-image: url(./assets/images/recomendado/recomendado4.jpg);">
                    <a href="https://www.raisin.es/educacion-financiera/acciones-de-una-empresa/" target="_blank"  class="link-noticia">
                        <div class="noticia">
                            <h3>RESUMEN</h3>
                            <P>Un mes movido para la empresa, pero sus dueños deben estar contentos, mira su progreso..</P>
                            <small>30/03/2025</small>
                        </div>
                    </a>
                </div>
     */