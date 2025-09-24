import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const listCat = [
    {
      label: "",
      value: "",
    },
  ];
  const localdata = localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData") as string)
    : [];
  const [list, setList] = useState<any[]>([
    ...localdata,
    // {
    //   cat: "2",
    //   name: "SINDU KISNA INDRACAHYA dan KURNIA SARI",
    // },
    // {
    //   cat: "2",
    //   name: "Usman Idzhami",
    // },
    // {
    //   cat: "2",
    //   name: "Raga Bayu Krisna",
    // },
    // {
    //   cat: "2",
    //   name: "Ahmad Ilahana",
    // },
    // {
    //   cat: "2",
    //   name: "Mitsal Ghapiqi dan istri",
    // },
  ]);

  const upperCaseText = (str: string, isTitle = false) =>
    str
      .toLowerCase()
      .split("dan")
      .map((word) => word.toUpperCase())
      .join(isTitle ? "&" : "dan");
  const changeSpace = (str: string) => str.replaceAll(" ", "+");
  const newMsg = (name = "", cat = "") =>
    `Yth. ${upperCaseText(
      name,
      true
    )}\n\nAssalamualaikum Warahmatullahi Wabarakatuh\n\nDengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan kami :\n\n*Aisyah & Warto*\n\nBerikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :\n\nhttps://byattari.com/aisyah-warto/?to=${changeSpace(
      upperCaseText(name)
    )}&cat=${cat}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/I berkenan untuk hadir dan memberikan doa restu.\n\nMohon maaf perihal undangan hanya dibagikan melalui pesan ini.\n\n*Note :*\n_Jika link tidak bisa dibuka, silahkan copy link kemudian paste di Chrome atau Browser lainnya.._\n_Untuk tampilan terbaik, silahkan akses melalui Browser Chrome / Safari dan non-aktifkan Dark Mode / Mode Gelap.._\n\nTerima kasih banyak atas perhatiannya.\n\nWassalamualaikum Warahmatullahi Wabarakatuh`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <input
          className="w-full outline-amber-200 bg-gray-600 rounded-sm p-2 text-white"
          name=""
          id=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          id="form-field-guest_cat"
          className="bg-white text-amber-950 p-2 w-full"
        >
          <option value="">Pilih waktu</option>
          <option value="1">TAMU VIP 13.00 - 15.00</option>
          <option value="2">TAMU REGULER A 13.00 - 13.45</option>
          <option value="3">TAMU REGULER B 13.45 - 14.30</option>
          <option value="4">TAMU REGULER&nbsp;C 14.30 - 15.15 </option>
          <option value="5">TAMU REGULER D 15.15 - 16.00</option>
          <option value="6">TAMU REGULER E 16.30 - 20.00</option>
          <option value="7">Keluarga CPP 13.00 - 19.00</option>
          <option value="8">Keluarga CPW 13.00 - 19.00</option>
        </select>
        {!cat && !name ? (
          <button
            disabled={!cat || !name}
            className="cursor-not-allowed bg-white hover:bg-amber-500 px-2 rounded"
          >
            -
          </button>
        ) : (
          <button
            disabled={!cat || !name}
            className="cursor-pointer bg-white hover:bg-amber-500 px-2 rounded"
            onClick={() => {
              let newData = [
                ...list,
                {
                  cat,
                  name,
                },
              ];
              setList(newData);
              localStorage.setItem("listData", JSON.stringify(newData));
              setName("");
              setCat("");
            }}
          >
            generate
          </button>
        )}
      </div>
      {list.map((item) => (
        // <div
        //   dangerouslySetInnerHTML={{ __html: newMsg(item.name, item.cat) }}
        // ></div>
        <div
          key={item.name}
          className="my-2 border border-amber-900 p-2 rounded-2xl"
        >
          {item.name}
          <button
            className="ml-2 cursor-pointer bg-amber-700 hover:bg-amber-500 px-2 rounded"
            onClick={() =>
              navigator.clipboard.writeText(newMsg(item.name, item.cat))
            }
          >
            Copy
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
