export default class RemoveAccent
{
    #initialText
    #noAccentued

    constructor ()
    {
        this.#initialText = "";
        this.#noAccentued = "";
    }

    setText (_text)
    {
        this.#validateText(_text);
    };

    getText ()
    {
        return this.#noAccentued;
    };

    #validateText = (_text) =>
    {
        if (typeof (_text) != "string")
        {
            throw new Error("Invalid argument! Must be string!");
        }
        else
        {
            this.#initialText = _text;
            this.#removeAccents();
        };
    };

    // remove os acentos mantendo os espaços
    #removeAccents = () =>
    {
        // this.#noAccentued = this.#initialText.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''); <=== remove os acentos e os espaços
        this.#noAccentued = this.#initialText.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
    };
}