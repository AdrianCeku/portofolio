import qrcode
import tkinter
import customtkinter 
from PIL import Image

Version = "1.2.2"

# Generates the QR Code and saves it. Gets called when you press on "Generate" 
def create_qr(mode=""):
    qr = qrcode.QRCode(
            version=round(version_slider.get()),    # Gets values of sliders and error correction
            box_size=round(boxsize_slider.get()),
            border=round(border_slider.get()),
            error_correction=get_error_correction()
    )
    qr.add_data(content_box.get("1.0","end-1c")) # Gets content from row 1 idex 0 up to the end but deletes the last character (-1c) because using "end" always adds a linebreak at the end

    if mode == "temp": # If mode == "temp", save image to temp folder for use in the preview window
        if logo_checkbox.get() == 1: # generates qr code and adds logo if enabled
            if filetype_box.get() == ".jpg": img = qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get()).convert("RGB") # Converts to RGB without transparency as .jpg doenst support it
            else: img = qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get()).convert("RGBA")
            img = img.resize((400,400))
            logo = Image.open("temp/logo.png").convert("RGBA")
            logo = logo.resize((x:=20 * round(logosize_slider.get()),y:= 20 * round(logosize_slider.get())))
            img.paste(logo, (200 - int(x/2),200 - int(y/2)),logo)
            img.save("temp/temp.png")
        else: # just generates qr code without adding the logo if disabled
            img = qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get())
            img = img.resize((400,400))
            img.save("temp/temp.png")

    elif logo_checkbox.get() == 1: # checks if logo addition is enabled
        if filetype_box.get() == ".jpg": img = qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get()).convert("RGB") # Converts to RGB without transparency as .jpg doenst support it
        else: img = qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get()).convert("RGBA")
        img = img.resize((2000,2000))
        logo = Image.open("temp/logo.png").convert("RGBA")
        logo = logo.resize((x:=100 * round(logosize_slider.get()),y:= 100 * round(logosize_slider.get())))
        img.paste(logo, (1000 - int(x/2),1000 - int(y/2)),logo)
        return img

    elif filetype_box.get() == ".svg":
        return qr.make_image(image_factory=qrcode.image.svg.SvgImage) # Use svg imagefactory if selected
    else: 
        return qr.make_image(back_color=background_color_box.get(),fill_color=fill_color_box.get())

def create_and_safe_qr():
    img = create_qr()
    img.save(f"QR-Codes/{filename_box.get()}{filetype_box.get()}") # Saves with chosen name and file extension

# Returns selected Error Correction Level. Gets called when Generating a QR Code
def get_error_correction():
    if error_corection_box.get()=="L (7%)":
        return qrcode.constants.ERROR_CORRECT_L
    elif error_corection_box.get()=="M (15%)":
        return qrcode.constants.ERROR_CORRECT_M
    elif error_corection_box.get()=="Q (25%)":
        return qrcode.constants.ERROR_CORRECT_Q
    elif error_corection_box.get()=="H (30%)":
        return qrcode.constants.ERROR_CORRECT_H
    else: return qrcode.constants.ERROR_CORRECT_M

def select_logo(): #Gets called when someone presses the "select logo" button
    logo_path = tkinter.filedialog.askopenfilename(title="Select a logo",
        initialdir="/",
        filetypes=(
            ("Image file", "*.png"),
            ("Image file", "*.jpg"),
            ("Image file", "*.webp"),
            ("All files", "*.*")
            )
        )

    logo = Image.open(logo_path)
    logo.save("temp/logo.png")
    update_ui()

# Updates ui to represent current values. Gets called whenever a slider or combobox is changed
def update_ui(_ = ""):
    if preview_checkbox.get() == 1:
        root.geometry("1200x600")
        settings_frame.place(relx=0.25, rely=0.5, anchor=tkinter.CENTER)
        preview_frame.place(relx=0.75, rely=0.5, anchor=tkinter.CENTER)
        create_qr("temp")
        preview_image.configure(image= tkinter.PhotoImage(file="temp/temp.png"))
    else:
        root.geometry("600x600")
        settings_frame.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)
        preview_frame.place(relx=2, anchor=tkinter.CENTER)

    if logo_checkbox.get() == 1:
        border_slider.configure(state="disabled",button_color="grey")
        border_slider.set(4)
        boxsize_slider.configure(state="disabled",button_color="grey")
        boxsize_slider.set(100)
        error_corection_box.configure(values=["Q (25%)","H (30%)"])
        if (error_corection_box.get() != "H (30%)") and (error_corection_box.get() != "Q (25%)") : error_corection_box.set("H (30%)")
        if filetype_box.get() == ".svg":
            filetype_box.set(".png")
    else:
        border_slider.configure(state="normal",button_color=["#3a7ebf", "#1f538d"])
        boxsize_slider.configure(state="normal",button_color=["#3a7ebf", "#1f538d"])
        error_corection_box.configure(values=["L (7%)","M (15%)","Q (25%)","H (30%)"])

    if background_color_box.get() == "transparent":
        if filetype_box.get() == ".jpg": filetype_box.set(".png")
        if logo_checkbox.get() == 1:
            filetype_box.configure(values=[".png",".webp"])
        else:
            filetype_box.configure(values=[".png",".svg",".webp"])
    else:
        if logo_checkbox.get() == 1:
            filetype_box.configure(values=[".png",".jpg",".webp"])
        else:
            filetype_box.configure(values=[".png",".jpg",".svg",".webp"])

    version_slider_label.configure(text=f"Version ({round(version_slider.get())})")
    border_slider_label.configure(text=f"Bordersize ({round(border_slider.get())})")
    boxsize_slider_label.configure(text=f"Size ({round(boxsize_slider.get())})")
    logosize_slider_label.configure(text=f"Logosize ({round(logosize_slider.get())})")

# customtkinter setup
customtkinter.set_appearance_mode("Dark")
customtkinter.set_default_color_theme("dark-blue")
root = customtkinter.CTk()
root.geometry("600x600")
root.title(f"QR Code Generator (Version {Version})")
root.resizable(False,False)

## GUI Elements. All are structured very similar

# Settings Frame
settings_frame = customtkinter.CTkFrame(master=root,
                                    width=600,
                                    height=600,
                                    border_width=0,
                                    corner_radius=0)
settings_frame.place(relx=0.25, rely=0.5, anchor=tkinter.CENTER)

# Filename Entrybox + Label
filename_box =customtkinter.CTkEntry(master=settings_frame,
                                    width=450,
                                    height=20,
                                    border_width=2,
                                    corner_radius=10)
filename_box.place(relx=0.5, rely=0.1, anchor=tkinter.CENTER)

filename_box.insert(0,"qr-code")

filename_box_label = customtkinter.CTkLabel(master=settings_frame,
                                    text="Filename",
                                    width=100,
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
filename_box_label.place(relx=0.175, rely=0.060, anchor=tkinter.CENTER)

# Content Textbox + Label
content_box = customtkinter.CTkTextbox(master=settings_frame,
                                    width=450,
                                    height=200,
                                    border_width=2,
                                    corner_radius=10)
content_box.place(relx=0.5, rely=0.335, anchor=tkinter.CENTER)

content_box.bind("<Key>", update_ui)

content_box_label = customtkinter.CTkLabel(master=settings_frame,
                                    text="Content",
                                    width=100,
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
content_box_label.place(relx=0.170, rely=0.15, anchor=tkinter.CENTER)

# Advanced Options Frame + Label
advanced_options = customtkinter.CTkFrame(master=settings_frame,
                                    width=450,
                                    height=150,
                                    border_width=2,
                                    corner_radius=10)
advanced_options.place(relx=0.5, rely=0.7, anchor=tkinter.CENTER)

advanced_options_label = customtkinter.CTkLabel(master=settings_frame,
                                    text="Advanced Options",
                                    width=100,
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
advanced_options_label.place(relx=0.22, rely=0.55, anchor=tkinter.CENTER)

# Filetype Combobox + Label
filetype_box = customtkinter.CTkComboBox(master=advanced_options,
                                    width=70,
                                    height=20,
                                    values=[".png",".jpg",".svg",".webp"],
                                    command=update_ui)
filetype_box.place(relx=0.2, rely=0.27, anchor=tkinter.CENTER)
filetype_box.set(".png")  # Sets initial value

filetype_box_label = customtkinter.CTkLabel(master=advanced_options,
                                    text="File Extension",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
filetype_box_label.place(relx=0.2, rely=0.12, anchor=tkinter.CENTER)

# Errorcorrection Combobox + Label
error_corection_box = customtkinter.CTkComboBox(master=advanced_options,
                                    width=70,
                                    height=20,
                                    values=["L (7%)","M (15%)","Q (25%)","H (30%)"],
                                    command=update_ui)
error_corection_box.place(relx=0.4, rely=0.27, anchor=tkinter.CENTER)
error_corection_box.set("M (15%)")  # Sets initial value

filetype_box_label = customtkinter.CTkLabel(master=advanced_options,
                                    text="Error Correction",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
filetype_box_label.place(relx=0.4, rely=0.12, anchor=tkinter.CENTER)

# Color Combobox # Label
fill_color_box = customtkinter.CTkComboBox(master=advanced_options,
                                    width=70,
                                    height=20,
                                    values=["black","white","red","green", "blue", "yellow", "orange", "pink", "purple"],
                                    command=update_ui)
fill_color_box.place(relx=0.6, rely=0.27, anchor=tkinter.CENTER)
fill_color_box.set("black")  # Sets initial value

filetype_box_label = customtkinter.CTkLabel(master=advanced_options,
                                    text="Color",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
filetype_box_label.place(relx=0.6, rely=0.12, anchor=tkinter.CENTER)

# Backgroundcolor Combobox + Slider
background_color_box = customtkinter.CTkComboBox(master=advanced_options,
                                    width=70,
                                    height=20,
                                    values=["transparent","black","white","red","green", "blue", "yellow", "orange", "pink", "purple"],
                                    command=update_ui)
background_color_box.place(relx=0.8, rely=0.27, anchor=tkinter.CENTER)
background_color_box.set("white")  # Sets initial value

filetype_box_label = customtkinter.CTkLabel(master=advanced_options,
                                    text="Background Color",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
filetype_box_label.place(relx=0.8, rely=0.12, anchor=tkinter.CENTER)

# Version Slider + Label
version_slider = customtkinter.CTkSlider(master=advanced_options,
                                        width=320,
                                        height=20,
                                        from_=1,
                                        to=40,
                                        number_of_steps=40,
                                        command=update_ui)
version_slider.place(relx=0.6, rely=0.47, anchor=tkinter.CENTER)
version_slider.set(1) # Sets initial value

version_slider_label = customtkinter.CTkLabel(master=advanced_options,
                                    text=f"Version ({round(version_slider.get())})",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
version_slider_label.place(relx=0.125, rely=0.47, anchor=tkinter.CENTER)


# Border Slider + Label
border_slider = customtkinter.CTkSlider(master=advanced_options,
                                        width=320,
                                        height=20,
                                        from_=0,
                                        to=100,
                                        number_of_steps=101,
                                        command=update_ui)
border_slider.place(relx=0.6, rely=0.67, anchor=tkinter.CENTER)
border_slider.set(4) # Sets initial value

border_slider_label = customtkinter.CTkLabel(master=advanced_options,
                                    text=f"Border Size ({round(border_slider.get())})",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
border_slider_label.place(relx=0.125, rely=0.67, anchor=tkinter.CENTER)

# Boxsize Slider + Label
boxsize_slider = customtkinter.CTkSlider(master=advanced_options,
                                    width=320,
                                    height=20,
                                    from_=1,
                                    to=100,
                                    number_of_steps=100,
                                    command=update_ui)
boxsize_slider.place(relx=0.6, rely=0.87, anchor=tkinter.CENTER)
boxsize_slider.set(10) # Sets initial value

boxsize_slider_label = customtkinter.CTkLabel(master=advanced_options,
                                    text=f"Size ({round(boxsize_slider.get())})",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
boxsize_slider_label.place(relx=0.125, rely=0.87, anchor=tkinter.CENTER)

# Preview Frame
preview_frame = customtkinter.CTkFrame(master=root,
                                width=600,
                                height=600,
                                border_width=0,
                                corner_radius=0)
preview_frame.place(relx=0.75, rely=0.5, anchor=tkinter.CENTER)

# Preview Checkbox
preview_checkbox = customtkinter.CTkCheckBox(master=settings_frame,
                                width=100,
                                height=20,
                                text="Enable Preview",
                                command=update_ui)

preview_checkbox.place(relx=0.45, rely=0.87, anchor=tkinter.CENTER)

# Logo Checkbox
logo_checkbox = customtkinter.CTkCheckBox(master=settings_frame,
                                width=100,
                                height=20,
                                text="Enable Logo",
                                command=update_ui)

logo_checkbox.place(relx=0.22, rely=0.87, anchor=tkinter.CENTER)

# Logo Select Button

logo_select_button = customtkinter.CTkButton(master=settings_frame,
                                width=110,
                                height=20,
                                fg_color="#888888",
                                hover_color="#666666",
                                text="Change Logo",
                                command=select_logo)

logo_select_button.place(relx=0.225, rely=0.965, anchor=tkinter.CENTER)

# Logosize Slider + Label
logosize_slider = customtkinter.CTkSlider(master=settings_frame,
                                    width=120,
                                    height=20,
                                    from_=1,
                                    to=10,
                                    number_of_steps=10,
                                    command=update_ui)
logosize_slider.place(relx=0.23, rely=0.92, anchor=tkinter.CENTER)
logosize_slider.set(5) # Sets initial value

logosize_slider_label = customtkinter.CTkLabel(master=settings_frame,
                                    text=f"Logosize ({round(logosize_slider.get())})",
                                    height=20,
                                    corner_radius=8,
                                    fg_color="transparent")
logosize_slider_label.place(relx=0.065, rely=0.92, anchor=tkinter.CENTER)

# Save Button
save_button = customtkinter.CTkButton(master=settings_frame,
                                    width=120,
                                    height=32,
                                    corner_radius=8,
                                    text="Save",
                                    command=create_and_safe_qr)
save_button.place(relx=0.77, rely=0.88, anchor=tkinter.CENTER)

# Preview Image
create_qr("temp")
preview_image = customtkinter.CTkLabel(master=preview_frame,
                                width=400,
                                height=400,
                                corner_radius=0,
                                text="",
                                image= tkinter.PhotoImage(file="temp/temp.png"))

preview_image.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)


# Updates ui and starts the program
update_ui()
root.mainloop()

