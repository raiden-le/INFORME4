document.addEventListener("DOMContentLoaded", () => {
    // Menú Hamburguesa
    const menuToggle = document.getElementById("menuToggle");
    const menuPrincipal = document.getElementById("menuPrincipal");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            menuPrincipal.classList.toggle("active");
        });
    }

    // Modo Oscuro / Claro
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "🌙";
    });

    // LÓGICA DEL CARRITO DE COMPRAS
    let carrito = [];

    const cartModal = document.getElementById("cartModal");
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartCount = document.getElementById("cartCount");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const totalCantidad = document.getElementById("totalCantidad");
    const totalPrecio = document.getElementById("totalPrecio");
    const btnCheckout = document.getElementById("btnCheckout");

    // Abrir/Cerrar Carrito
    cartToggleBtn.addEventListener("click", () => cartModal.classList.add("active"));
    cartCloseBtn.addEventListener("click", () => cartModal.classList.remove("active"));

    // Añadir producto al carrito
    const btnsAgregar = document.querySelectorAll(".btn-card");
    btnsAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
            const nombre = btn.getAttribute("data-nombre");
            const precio = parseFloat(btn.getAttribute("data-precio"));

            const productoExistente = carrito.find(item => item.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            actualizarCarritoUI();
            cartModal.classList.add("active"); // Abre automáticamente el carrito al añadir
        });
    });

    // Actualizar la interfaz del carrito
    function actualizarCarritoUI() {
        cartItemsContainer.innerHTML = "";

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío.</p>';
            cartCount.textContent = "0";
            totalCantidad.textContent = "0";
            totalPrecio.textContent = "$0.00";
            return;
        }

        let totalItems = 0;
        let precioTotal = 0;

        carrito.forEach((prod, index) => {
            totalItems += prod.cantidad;
            precioTotal += prod.precio * prod.cantidad;

            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h4>${prod.nombre}</h4>
                    <p>$${prod.precio.toFixed(2)} x ${prod.cantidad}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="btn-qty" onclick="restarCantidad(${index})">-</button>
                    <span>${prod.cantidad}</span>
                    <button class="btn-qty" onclick="sumarCantidad(${index})">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        cartCount.textContent = totalItems;
        totalCantidad.textContent = totalItems;
        totalPrecio.textContent = `$${precioTotal.toFixed(2)}`;
    }

    // Funciones globales para ajustar cantidades desde dentro del modal
    window.sumarCantidad = (index) => {
        carrito[index].cantidad++;
        actualizarCarritoUI();
    };

    window.restarCantidad = (index) => {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarritoUI();
    };

    // Finalizar compra
    btnCheckout.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert(`¡Gracias por tu compra! Compraste ${totalCantidad.textContent} productos por un total de ${totalPrecio.textContent}.`);
        carrito = [];
        actualizarCarritoUI();
        cartModal.classList.remove("active");
    });

    // Formulario Alerta de Envío
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto. 🚀");
            formContacto.reset();
        });
    }

    // LAS 50 PREGUNTAS Y RESPUESTAS DEL CHATBOT
    const faqData = [
        { q: "1. ¿Cuáles son los métodos de pago?", a: "Aceptamos tarjetas de crédito, débito, Yape, Plin y transferencias bancarias." },
        { q: "2. ¿Hacen envíos internacionales?", a: "Sí, realizamos envíos nacionales e internacionales." },
        { q: "3. ¿Cuánto tarda en llegar mi pedido?", a: "Tarda de 2 a 4 días hábiles según la ciudad de destino." },
        { q: "4. ¿Tienen costo los envíos?", a: "El envío es gratuito en compras superiores a un valor mínimo." },
        { q: "5. ¿Cómo puedo rastrear mi paquete?", a: "Te enviamos un código de seguimiento por correo o WhatsApp." },
        { q: "6. ¿Puedo cambiar o devolver un producto?", a: "Cuentas con 30 días para solicitar cambios o devoluciones." },
        { q: "7. ¿Cómo solicito la garantía?", a: "Envíanos tu comprobante de compra e imágenes del producto a soporte." },
        { q: "8. ¿Los productos son originales?", a: "Garantizamos productos 100% nuevos y originales." },
        { q: "9. ¿Emiten factura?", a: "Sí, emitimos boletas y facturas electrónicas según lo requieras." },
        { q: "10. ¿Puedo cancelar un pedido?", a: "Puedes cancelarlo siempre que no haya sido despachado." },
        { q: "11. ¿Dónde se ubican?", a: "Operamos de manera virtual con entregas directas a domicilio." },
        { q: "12. ¿Qué hago si mi pedido llega dañado?", a: "Escríbenos de inmediato para gestionar un reemplazo sin costo." },
        { q: "13. ¿Tienen descuentos por mayor?", a: "Sí, ofrecemos precios especiales a partir de 12 unidades." },
        { q: "14. ¿Cómo sé si hay disponibilidad?", a: "Todos los ítems visibles en la tienda están disponibles." },
        { q: "15. ¿Los precios incluyen impuestos?", a: "Sí, todos los precios mostrados ya incluyen IGV / Impuestos." },
        { q: "16. ¿Cuál es el mínimo para compras al por mayor?", a: "El mínimo de compra al por mayor es de 12 unidades por producto." },
        { q: "17. ¿Ofrecen pagos a cuotas?", a: "Puedes pagar en cuotas utilizando tu tarjeta de crédito habilitada." },
        { q: "18. ¿Cómo puedo contactar a soporte?", a: "A través del formulario de contacto, correo o WhatsApp." },
        { q: "19. ¿El carrito guarda mis productos?", a: "Sí, los elementos se guardan mientras navegas en la tienda." },
        { q: "20. ¿Tienen garantía de fábrica?", a: "Todos los artículos incluyen garantía oficial por fallas de origen." },
        { q: "21. ¿Qué hago si no recibo confirmación?", a: "Revisa tu bandeja de spam o contáctanos por WhatsApp." },
        { q: "22. ¿Puedo modificar la dirección de entrega?", a: "Sí, solicitándolo antes del envío de la orden." },
        { q: "23. ¿Atienden a empresas o corporativos?", a: "Ofrecemos cotizaciones e inventario especial para empresas." },
        { q: "24. ¿Es seguro mi pago en la web?", a: "Utilizamos plataformas con cifrado SSL de máxima seguridad." },
        { q: "25. ¿Cómo recupero mi contraseña?", a: "Usa la opción de restablecer desde la pantalla de inicio de sesión." },
        { q: "26. ¿Dónde aplico un cupón de descuento?", a: "Lo ingresas en la pantalla de pago previo a finalizar la compra." },
        { q: "27. ¿Cuáles son sus horarios de atención?", a: "Atendemos dudas y respuestas de lunes a viernes de 8:00 AM a 6:00 PM." },
        { q: "28. ¿Procesan pedidos en fines de semana?", a: "El sistema procesa compras 24/7 y despacha el siguiente día hábil." },
        { q: "29. ¿Dónde están las características del producto?", a: "Cada artículo dispone del detalle completo en su descripción." },
        { q: "30. ¿Tienen gift cards o tarjetas de regalo?", a: "Ofrecemos tarjetas virtuales con montos configurables." },
        { q: "31. ¿Hacen entregas en zonas alejadas?", a: "Llegamos a todo el país mediante agencias courier aliadas." },
        { q: "32. ¿Aceptan transferencias bancarias directas?", a: "Sí, aceptamos depósitos y transferencias CCI." },
        { q: "33. ¿Los artículos incluyen manual de usuario?", a: "Sí, vienen adjuntos en la caja o en formato PDF descargable." },
        { q: "34. ¿Los precios cambian constantemente?", a: "Actualizamos ofertas de acuerdo con promociones del mes." },
        { q: "35. ¿Se aplican cargos extra por embalaje?", a: "El embalaje de protección va totalmente gratis." },
        { q: "36. ¿Puedo comprar sin abrir una cuenta?", a: "Puedes comprar rápidamente realizando el pago como invitado." },
        { q: "37. ¿Dónde puedo ver opiniones de clientes?", a: "Puedes encontrarlas en las publicaciones de nuestras redes sociales." },
        { q: "38. ¿Qué sucede si la entrega falla?", a: "El repartidor intentará la entrega una segunda vez de forma gratuita." },
        { q: "39. ¿Tienen catálogo en formato PDF?", a: "Puedes solicitarlo para mayoristas llenando el formulario." },
        { q: "40. ¿Brindan soporte postventa?", a: "Te orientamos con la configuración o instalación si la necesitas." },
        { q: "41. ¿Se puede retirar el producto en tienda?", a: "Consulta disponibilidades de recojo mediante nuestro canal de atención." },
        { q: "42. ¿Tienen campañas Cyber u Ofertas?", a: "Realizamos grandes campañas con promociones periódicas." },
        { q: "43. ¿Tienen descuentos por pago en efectivo?", a: "Ofrecemos beneficios adicionales según promociones vigentes." },
        { q: "44. ¿Cada cuánto tiempo renuevan stock?", a: "Actualizamos el catálogo todas las semanas." },
        { q: "45. ¿Ofrecen empaque especial de regalo?", a: "Puedes indícarlo en el campo de comentarios de tu formulario." },
        { q: "46. ¿Cómo escribo directamente por WhatsApp?", a: "Haciendo clic en el icono de WhatsApp al pie de página." },
        { q: "47. ¿Cuál es el material de construcción?", a: "Se específica en la ficha descriptiva de cada artículo." },
        { q: "48. ¿En cuánto tiempo reembolsan si se cancela?", a: "Los reembolsos se acreditaciones entre 24 y 72 horas." },
        { q: "49. ¿Tienen sección de remates o liquidación?", a: "Lanzamos productos en liquidación en fechas de temporada." },
        { q: "50. ¿Cómo me contacto con un asesor humano?", a: "Escríbenos en el formulario de contacto y te llamaremos." }
    ];

    const chatToggleBtn = document.getElementById("chatToggleBtn");
    const chatContainer = document.getElementById("chatContainer");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatSelect = document.getElementById("chatSelect");
    const chatMessages = document.getElementById("chatMessages");

    faqData.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.q;
        chatSelect.appendChild(option);
    });

    chatToggleBtn.addEventListener("click", () => chatContainer.classList.toggle("active"));
    chatCloseBtn.addEventListener("click", () => chatContainer.classList.remove("active"));

    chatSelect.addEventListener("change", (e) => {
        const index = e.target.value;
        if (index === "") return;

        const faq = faqData[index];

        const userMsg = document.createElement("div");
        userMsg.className = "chat-message user";
        userMsg.textContent = faq.q;
        chatMessages.appendChild(userMsg);

        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.className = "chat-message bot";
            botMsg.textContent = faq.a;
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 300);

        chatSelect.value = "";
    });
});