import qrcode
from PIL import Image

def generate_qr():
    print("Gerando QR Codes...")
    with open("../cpf.txt") as f:  # Certifique-se de que o caminho está correto
        i = 1
        images_per_page = 9
        page_number = 1
        qr_codes = []

        for line in f:
            cpf = line.strip()
            url = "vote.info/?cpf="
            qr = qrcode.QRCode(
                version=1, 
                box_size=10, 
                border=4, 
                error_correction=qrcode.constants.ERROR_CORRECT_L
            )
            info = url + cpf
            qr.add_data(info)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")
            
            # Salve a imagem em um arquivo
            qr_codes.append(img)

            # Verifica se alcançou o limite de imagens por página
            if i % images_per_page == 0 or i == 50:
                combine_qr_codes(qr_codes, page_number)
                qr_codes = []
                page_number += 1

            i += 1

def combine_qr_codes(qr_codes, page_number):
    print(f"Gerando página {page_number}...")
    page_width = 3 * qr_codes[0].size[0]  # 3 QR codes por linha
    page_height = 3 * qr_codes[0].size[1] # 3 QR codes por coluna
    page_image = Image.new('RGB', (page_width, page_height), 'white')

    x_offset = 0
    y_offset = 0
    for i, qr in enumerate(qr_codes):
        page_image.paste(qr, (x_offset, y_offset))
        x_offset += qr.size[0]
        if (i + 1) % 3 == 0:
            x_offset = 0
            y_offset += qr.size[1]

    page_image.save(f'./media/qr_page_{page_number}.png')  # Fix the path to save the image

if __name__ == "__main__":
    generate_qr()
