// data.js

const restaurantData = [
    {
        title: "The Tasty Spoon",
        imageUrl: "https://example.com/images/tasty-spoon.jpg",
        foods: ["Pizza", "Burger", "Pasta"],
        time: "10:00 AM - 10:00 PM",
        pickup: true,
        delivery: true,
        isOpen: true,
        logoUrl: "https://example.com/logos/tasty-spoon-logo.png",
        rating: 4.5,
        ratingCount: "200",
        code: "TASTY123",
        coords: {
            id: "loc1",
            latitude: 37.7749,
            latitudeDelta: 0.0922,
            longitude: -122.4194,
            longitudeDelta: 0.0421,
            address: "123 Market Street, San Francisco, CA",

        }
    },
    {
        title: "Foodies Heaven",
        imageUrl: "https://example.com/images/foodies-heaven.jpg",
        foods: ["Sushi", "Ramen", "Tempura"],
        time: "11:00 AM - 11:00 PM",
        pickup: true,
        delivery: false,
        isOpen: false,
        logoUrl: "https://example.com/logos/foodies-heaven-logo.png",
        rating: 4.2,
        ratingCount: "150",
        code: "FOODIE456",
        coords: {
            id: "loc2",
            latitude: 40.7128,
            latitudeDelta: 0.0922,
            longitude: -74.0060,
            longitudeDelta: 0.0421,
            address: "456 Broadway, New York, NY",

        }
    }
];

export default restaurantData;
