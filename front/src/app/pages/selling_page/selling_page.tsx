import { time } from "console";
import { useState } from "react";

export const SellingPage = () => {
  const [selectedSizeType, setSelectedSizeType] = useState<'clothes' | 'shoes'>('clothes');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // useEffect(() => {
  //   if (selectedImage !== null) {
  //     setValue(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage, setValue]);

  return (
    <div className="relatve px-5 pt-7">
      <div className="flex flex-row justify-between">
        <button
          className="rounded-full w-9 h-9 ring-1 ring-grey-800 flex justify-center items-center"
          onClick={() => {
            document.location.href = "/";
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="font-bold font-raleway ml-2 mb-3 my-1">Ajouter un article</h2>
        <div className="invisible w-9 h-9"></div>
      </div>
      <div className="my-4">
        <div className="flex flex-row">
          <h2 className="font-bold text-lg">Ajouter des photos</h2>
          <p className="text-grey-400 text-sm mt-1 ml-2">3 max</p>
        </div>
        <div className="flex flex-row justify-between mt-4">
          {uploadedImages.map((img, i) =>
            <div
              className="object-cover relative w-1/3 h-32 rounded-lg mx-1"
            >
              <button
                className="hover:bg-gray-200 opacity-50 absolute w-full h-full rounded-lg"
                onClick={() => {
                  if (selectedImage === i) {
                    setSelectedImage(null);
                    setUploadedImages((imgs) => imgs.filter((_, index) => index !== i));
                  } else {
                    setSelectedImage(i);
                  }
                }}
                onMouseOut={() => {
                  setSelectedImage(null);
                }}
              >
                {selectedImage === i &&
                  <svg className="mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.1429C17.0495 21.1429 21.1429 17.0495 21.1429 12C21.1429 6.95057 17.0495 2.85718 12 2.85718C6.95057 2.85718 2.85718 6.95057 2.85718 12C2.85718 17.0495 6.95057 21.1429 12 21.1429Z" stroke="#101010" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.57141 8.57153L15.4286 15.4287M15.4286 8.57153L8.57141 15.4287" stroke="#101010" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              </button>
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="profile-pic"
                className="object-cover w-full h-32 rounded-lg"
              />
            </div>
          )}
          {uploadedImages.length < 3 && Array.from({ length: 3 - uploadedImages.length }).map((_, index) =>
            <button
              key={index}
              className="w-1/3 h-32 bg-slate-300 rounded-lg mx-1"
              onClick={() => {
                document.getElementById('file-upload')?.click();
                console.log(uploadedImages);
              }}
            >
              <svg className="m-auto w-10 h-10 rounded-full ring-cyan-800 ring-1" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.36084 16.753H16.8568M16.8568 16.753H26.3527M16.8568 16.753V7.25702M16.8568 16.753V26.2489" stroke="#256A85" strokeWidth="3.14437" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault() }} className="mt-4">
          <input className="w-full h-12 ring-1 ring-gray-300 border-none rounded-lg px-4 my-2" placeholder="Titre de l'article*" />
          <textarea className="w-full h-18 ring-1 ring-gray-300 border-none rounded-lg px-4 my-2" placeholder="Description de l'article" />
          <select defaultValue={""} className="w-full h-12 ring-1 ring-gray-300 border-none text-gray-500 rounded-lg px-4 my-2" placeholder="Provenance">
            <option disabled value="" className="text-gray-400">Provenance</option>
            <option value="online">Acheté en ligne</option>
            <option value="magasin">Acheté en magasin</option>
            <option value="fripe">Fripes</option>
          </select>
          <div className="flex flex-row justify-between mt-4">
            <h3 className="font-bold text-lg text-gray-900">Taille</h3>
            <div className="flex flex-row">
              <button
                onClick={() => setSelectedSizeType('clothes')}
                className={"px-2 mx-2 rounded-md text-sm text-gray-900 " + (selectedSizeType === 'clothes' ? 'bg-gray-400 ring-black ring-2' : 'bg-gray-200')}
              >
                Vêtements
              </button>
              <button
                onClick={() => setSelectedSizeType('shoes')}
                className={"px-2 mx-2 rounded-md text-sm text-gray-900 " + (selectedSizeType === 'shoes' ? 'bg-gray-400 ring-black ring-2' : 'bg-gray-200')}
              >
                Chaussures
              </button>
            </div>
          </div>
          <select className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {selectedSizeType === 'clothes' ? (
              <>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </>
            ) : (
              <>
                <option>34</option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
                <option>44</option>
                <option>45</option>
                <option>46</option>
                <option>47</option>
                <option>48</option>
                <option>49</option>
                <option>50</option>
              </>
            )}
          </select>
          <div className="mt-6 flex flex-row justify-between w-full">
            <p className="font-bold text-lg text-gray-900">Prix</p>
            <div className="relative w-1/3">
              <input
                type="number"
                className="w-full text-right px-2 py-1 pr-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p className="absolute right-0 top-0 mt-1.5 mr-3 text-black">€</p>
            </div>
          </div>
          <div className="flex flex-col items-center font-poppins">
            <input
              onClick={() => {
                document.location.href = "/";
              }}
              type="button"
              className="w-full h-12 bg-cyan-800 text-white font-semibold rounded-full mt-8"
              value="Ajouter l'article"
            />
            <a href="/" className="text-center text-gray-600 mx-auto mt-4">Supprimer</a>
          </div>
        </form>
      </div>

      <input
        id='file-upload'
        className="invisible"
        type="file"
        name="myImage"
        onChange={(event) => {
          setUploadedImages((imgs) => imgs.concat(Array.from(event.target.files || [])));
        }}
      />
    </div >
  );
};
