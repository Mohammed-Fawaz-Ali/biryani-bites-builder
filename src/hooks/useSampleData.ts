
import { supabase } from '@/integrations/supabase/client';

export const insertSampleMenuItems = async () => {
  try {
    // Get category IDs
    const { data: categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .select('id, name');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return;
    }

    const biryaniCat = categories.find(c => c.name === 'Biryani');
    const chickenCat = categories.find(c => c.name === 'Chicken');
    const kebabsCat = categories.find(c => c.name === 'Kebabs');
    const extrasCat = categories.find(c => c.name === 'Extras');

    const sampleItems = [
      {
        name: "Hyderabadi Chicken Biryani",
        name_ar: "برياني الدجاج الحيدرآبادي",
        description: "Aromatic basmati rice with tender chicken, cooked in traditional dum style",
        description_ar: "أرز بسمتي عطر مع دجاج طري، مطبوخ بطريقة الدم التقليدية",
        price: 29,
        image_url: "🍛",
        category_id: biryaniCat?.id,
        spice_level: 2,
        rating: 4.8,
        is_featured: true
      },
      {
        name: "Chicken Tikka Masala",
        name_ar: "دجاج تكا مصالا",
        description: "Grilled chicken in creamy tomato-based curry",
        description_ar: "دجاج مشوي في كاري كريمي بالطماطم",
        price: 25,
        image_url: "🍗",
        category_id: chickenCat?.id,
        spice_level: 2,
        rating: 4.6,
        is_featured: true
      },
      {
        name: "Mutton Biryani",
        name_ar: "برياني اللحم",
        description: "Premium mutton pieces with fragrant spices and saffron rice",
        description_ar: "قطع لحم فاخرة مع بهارات عطرية وأرز بالزعفران",
        price: 39,
        image_url: "🍛",
        category_id: biryaniCat?.id,
        spice_level: 3,
        rating: 4.9
      },
      {
        name: "Seekh Kebab",
        name_ar: "كباب سيخ",
        description: "Spiced minced meat grilled to perfection",
        description_ar: "لحم مفروم متبل ومشوي للكمال",
        price: 19,
        image_url: "🍢",
        category_id: kebabsCat?.id,
        spice_level: 3,
        rating: 4.7
      },
      {
        name: "Butter Chicken",
        name_ar: "دجاج بالزبدة",
        description: "Tender chicken in rich, buttery tomato gravy",
        description_ar: "دجاج طري في مرق طماطم غني بالزبدة",
        price: 27,
        image_url: "🍗",
        category_id: chickenCat?.id,
        spice_level: 1,
        rating: 4.8
      },
      {
        name: "Fish Biryani",
        name_ar: "برياني السمك",
        description: "Fresh fish fillets with coastal spices and basmati rice",
        description_ar: "فيليه سمك طازج مع بهارات ساحلية وأرز بسمتي",
        price: 35,
        image_url: "🍛",
        category_id: biryaniCat?.id,
        spice_level: 2,
        rating: 4.7
      },
      {
        name: "Chicken Tikka",
        name_ar: "دجاج تكا",
        description: "Marinated chicken chunks grilled in tandoor",
        description_ar: "قطع دجاج متبلة ومشوية في التندور",
        price: 23,
        image_url: "🍢",
        category_id: kebabsCat?.id,
        spice_level: 2,
        rating: 4.5
      },
      {
        name: "Dal Makhani",
        name_ar: "دال مخني",
        description: "Creamy black lentils cooked overnight",
        description_ar: "عدس أسود كريمي مطبوخ طوال الليل",
        price: 18,
        image_url: "🥗",
        category_id: extrasCat?.id,
        spice_level: 1,
        rating: 4.4
      },
      {
        name: "Paneer Tikka",
        name_ar: "بانير تكا",
        description: "Marinated cottage cheese cubes grilled with peppers",
        description_ar: "مكعبات جبن متبلة ومشوية مع الفلفل",
        price: 22,
        image_url: "🥗",
        category_id: extrasCat?.id,
        spice_level: 2,
        rating: 4.3
      }
    ];

    const { data, error } = await supabase
      .from('menu_items')
      .insert(sampleItems);

    if (error) {
      console.error('Error inserting sample data:', error);
    } else {
      console.log('Sample menu items inserted successfully');
    }
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};
