import { Dispatch, SetStateAction, useState } from "react";

enum CustomerType {
  FEMME = 0,
  HOMME,
  ENFANT,
}

interface AllCategoriesProps {
  setSearchTerms: Dispatch<SetStateAction<string>>;
}

export const AllCategories: React.FC<AllCategoriesProps> = ({ setSearchTerms }) => {
  const [selectedCustomerType, setSelectedCustomerType] = useState(CustomerType.FEMME);
  const [selectedCategory, setSelectedCategory] = useState("");

  let tabClasses = "absolute bottom-0 w-1/4 flex items-center justify-center border-b border-black";
  if (selectedCustomerType === CustomerType.FEMME) {
    tabClasses += " left-0";
  } else if (selectedCustomerType === CustomerType.HOMME) {
    tabClasses += " left-2/4 -translate-x-1/2";
  } else if (selectedCustomerType === CustomerType.ENFANT) {
    tabClasses += " right-0";
  }

  return (
    <>
      <div className="font-tenor relative flex flex-row justify-between w-full border-b py-3 items-center mb-4">
        <div className={tabClasses}>
          <div className="w-2 h-2 bg-black transform rotate-45 translate-y-1"></div>
        </div>
        <button
          className="text-xl text-gray-500"
          onClick={() => { setSelectedCategory(""); setSelectedCustomerType(CustomerType.FEMME) }}
        >
          FEMME
        </button>
        <button
          className="text-xl text-gray-500"
          onClick={() => { setSelectedCategory(""); setSelectedCustomerType(CustomerType.HOMME) }}
        >
          HOMME
        </button>
        <button
          className="text-xl text-gray-500"
          onClick={() => { setSelectedCategory(""); setSelectedCustomerType(CustomerType.ENFANT) }}
        >
          ENFANT
        </button>
      </div>
      <div className="flex flex-col w-full">
        {itemCategories[selectedCustomerType].map((category) => (
          <div className="my-1" key={category.name}>
            <div
              className="relative flex w-full shadow-md ring-gray-100 ring-1 rounded p-1 my-1"
              onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}
            >
              <img src={category.pic} className="w-12 h-12 rounded object-cover mr-2" />
              <h3 className="font-semibold font-raleway text-xl mt-2">{category.name}</h3>
              <div className={"absolute right-3 top-4 transition-transform " + (selectedCategory === category.name ? "-rotate-90" : "rotate-90")}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {selectedCategory === category.name && (
              <div className="py-4 grid grid-cols-2 gap-1">
                {category.subCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    className="font-raleway font-semibold p-1.5 m-1 rounded ring-2 ring-gray-300 text-center"
                    onClick={() => { setSearchTerms(subCategory) }}
                  >
                    <p>{subCategory}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

const itemCategories = [
  [
    {
      name: "Vêtements",
      pic: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      subCategories: [
        "Robe",
        "Pantalon",
        "Tshirt",
        "Jupe",
        "Short",
        "Veste",
        "Pull",
        "Chemise",
        "Manteau"
      ]
    },
    {
      name: "Chaussures",
      pic: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      subCategories: [
        "Baskets",
        "Sandales",
        "Bottes",
        "Talons",
        "Chaussures de sport",
        "Chaussures de ville",
        "Chaussons",
      ]
    },
    {
      name: "Sacs",
      pic: "https://images.unsplash.com/photo-1560891958-68bb1fe7fb78",
      subCategories: [
        "Sac à main",
        "Sac à dos",
        "Pochette",
        "Sac de voyage",
        "Sac bandoulière",
        "Sac de sport",
        "Sac de plage"
      ]
    },
    {
      name: "Accessoires",
      pic: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f",
      subCategories: [
        "Lunettes de soleil",
        "Ceinture",
        "Chapeau",
        "Bijoux",
        "Montre",
        "Echarpe",
        "Gants",
        "Casquette"
      ]
    },
    {
      name: "Lingerie",
      pic: "https://plus.unsplash.com/premium_photo-1675186049574-061fba2d243c",
      subCategories: [
        "Soutien-gorge",
        "Culotte",
        "Body",
        "Pyjama",
        "Nuisette",
        "Porte-jarretelles",
        "Collants",
        "Chaussettes"
      ]
    }
  ], [
    {
      name: "Vêtements",
      pic: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4",
      subCategories: [
        "Pantalon",
        "Tshirt",
        "Short",
        "Veste",
        "Pull",
        "Chemise",
        "Manteau"
      ]
    },
    {
      name: "Chaussures",
      pic: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      subCategories: [
        "Baskets",
        "Sandales",
        "Bottes",
        "Rangers",
        "Chaussures de sport",
        "Chaussures de ville",
        "Chaussons",
      ]
    },
    {
      name: "Sacs",
      pic: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f",
      subCategories: [
        "Sac à dos",
        "Pochette",
        "Sac de voyage",
        "Sac bandoulière",
        "Sac de sport",
      ]
    },
    {
      name: "Accessoires",
      pic: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
      subCategories: [
        "Lunettes de soleil",
        "Ceinture",
        "Chapeau",
        "Bijoux",
        "Montre",
        "Echarpe",
        "Gants",
        "Casquette"
      ]
    },
  ], [
    {
      name: "Vêtements",
      pic: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      subCategories: [
        "Robe",
        "Pantalon",
        "Tshirt",
        "Jupe",
        "Short",
        "Veste",
        "Pull",
        "Chemise",
        "Manteau"
      ]
    },
    {
      name: "Chaussures",
      pic: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      subCategories: [
        "Baskets",
        "Sandales",
        "Bottes",
        "Talons",
        "Chaussures de sport",
        "Chaussures de ville",
      ]
    },
    {
      name: "Sacs",
      pic: "https://images.unsplash.com/photo-1560891958-68bb1fe7fb78",
      subCategories: [
        "Sac à main",
        "Sac à dos",
        "Pochette",
        "Sac de voyage",
        "Sac bandoulière",
        "Sac de sport",
        "Sac de plage"
      ]
    },
    {
      name: "Accessoires",
      pic: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f",
      subCategories: [
        "Lunettes de soleil",
        "Ceinture",
        "Chapeau",
        "Bijoux",
        "Montre",
        "Echarpe",
        "Gants",
        "Casquette"
      ]
    },
    {
      name: "Lingerie",
      pic: "https://plus.unsplash.com/premium_photo-1675186049574-061fba2d243c",
      subCategories: [
        "Soutien-gorge",
        "Culotte",
        "Body",
        "Pyjama",
        "Nuisette",
        "Porte-jarretelles",
        "Collants",
        "Chaussettes"
      ]
    }
  ]
];
