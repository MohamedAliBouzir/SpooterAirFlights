export interface Airport {
    id: string; // IATA code
    name: string;
    city: string;
    country: string;
}

export const AIRPORTS: Airport[] = [
    // United States
    { id: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "United States" },
    { id: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States" },
    { id: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States" },
    { id: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "United States" },
    { id: "DEN", name: "Denver International Airport", city: "Denver", country: "United States" },
    { id: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
    { id: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States" },
    { id: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "United States" },
    { id: "LAS", name: "Harry Reid International Airport", city: "Las Vegas", country: "United States" },
    { id: "MCO", name: "Orlando International Airport", city: "Orlando", country: "United States" },
    { id: "EWR", name: "Newark Liberty International Airport", city: "Newark", country: "United States" },
    { id: "CLT", name: "Charlotte Douglas International Airport", city: "Charlotte", country: "United States" },
    { id: "PHX", name: "Phoenix Sky Harbor International Airport", city: "Phoenix", country: "United States" },
    { id: "IAH", name: "George Bush Intercontinental Airport", city: "Houston", country: "United States" },
    { id: "MIA", name: "Miami International Airport", city: "Miami", country: "United States" },
    { id: "BOS", name: "Logan International Airport", city: "Boston", country: "United States" },
    { id: "MSP", name: "Minneapolis-St Paul International Airport", city: "Minneapolis", country: "United States" },
    { id: "DTW", name: "Detroit Metropolitan Wayne County Airport", city: "Detroit", country: "United States" },
    { id: "PHL", name: "Philadelphia International Airport", city: "Philadelphia", country: "United States" },
    { id: "LGA", name: "LaGuardia Airport", city: "New York", country: "United States" },
    { id: "BWI", name: "Baltimore/Washington International Airport", city: "Baltimore", country: "United States" },
    { id: "SLC", name: "Salt Lake City International Airport", city: "Salt Lake City", country: "United States" },
    { id: "SAN", name: "San Diego International Airport", city: "San Diego", country: "United States" },
    { id: "IAD", name: "Washington Dulles International Airport", city: "Washington", country: "United States" },
    { id: "DCA", name: "Ronald Reagan Washington National Airport", city: "Washington", country: "United States" },
    { id: "TPA", name: "Tampa International Airport", city: "Tampa", country: "United States" },
    { id: "PDX", name: "Portland International Airport", city: "Portland", country: "United States" },
    { id: "STL", name: "St. Louis Lambert International Airport", city: "St. Louis", country: "United States" },
    { id: "HNL", name: "Daniel K. Inouye International Airport", city: "Honolulu", country: "United States" },
    { id: "AUS", name: "Austin-Bergstrom International Airport", city: "Austin", country: "United States" },
    { id: "BNA", name: "Nashville International Airport", city: "Nashville", country: "United States" },
    { id: "OAK", name: "Oakland International Airport", city: "Oakland", country: "United States" },
    { id: "RDU", name: "Raleigh-Durham International Airport", city: "Raleigh", country: "United States" },
    { id: "MSY", name: "Louis Armstrong New Orleans International Airport", city: "New Orleans", country: "United States" },

    // Canada
    { id: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
    { id: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada" },
    { id: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport", city: "Montreal", country: "Canada" },
    { id: "YYC", name: "Calgary International Airport", city: "Calgary", country: "Canada" },
    { id: "YEG", name: "Edmonton International Airport", city: "Edmonton", country: "Canada" },
    { id: "YOW", name: "Ottawa Macdonald-Cartier International Airport", city: "Ottawa", country: "Canada" },

    // United Kingdom
    { id: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom" },
    { id: "LGW", name: "London Gatwick Airport", city: "London", country: "United Kingdom" },
    { id: "MAN", name: "Manchester Airport", city: "Manchester", country: "United Kingdom" },
    { id: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "United Kingdom" },
    { id: "LTN", name: "London Luton Airport", city: "London", country: "United Kingdom" },
    { id: "STN", name: "London Stansted Airport", city: "London", country: "United Kingdom" },
    { id: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "United Kingdom" },
    { id: "GLA", name: "Glasgow Airport", city: "Glasgow", country: "United Kingdom" },

    // France
    { id: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
    { id: "ORY", name: "Paris-Orly Airport", city: "Paris", country: "France" },
    { id: "NCE", name: "Nice Côte d'Azur Airport", city: "Nice", country: "France" },
    { id: "LYS", name: "Lyon-Saint Exupéry Airport", city: "Lyon", country: "France" },
    { id: "MRS", name: "Marseille Provence Airport", city: "Marseille", country: "France" },
    { id: "TLS", name: "Toulouse-Blagnac Airport", city: "Toulouse", country: "France" },

    // Germany
    { id: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
    { id: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
    { id: "TXL", name: "Berlin Tegel Airport", city: "Berlin", country: "Germany" },
    { id: "BER", name: "Berlin Brandenburg Airport", city: "Berlin", country: "Germany" },
    { id: "DUS", name: "Düsseldorf Airport", city: "Düsseldorf", country: "Germany" },
    { id: "HAM", name: "Hamburg Airport", city: "Hamburg", country: "Germany" },
    { id: "CGN", name: "Cologne Bonn Airport", city: "Cologne", country: "Germany" },

    // Spain
    { id: "MAD", name: "Adolfo Suárez Madrid-Barajas Airport", city: "Madrid", country: "Spain" },
    { id: "BCN", name: "Barcelona-El Prat Airport", city: "Barcelona", country: "Spain" },
    { id: "AGP", name: "Málaga-Costa del Sol Airport", city: "Málaga", country: "Spain" },
    { id: "PMI", name: "Palma de Mallorca Airport", city: "Palma de Mallorca", country: "Spain" },
    { id: "SVQ", name: "Seville Airport", city: "Seville", country: "Spain" },
    { id: "VLC", name: "Valencia Airport", city: "Valencia", country: "Spain" },
    { id: "ALC", name: "Alicante-Elche Airport", city: "Alicante", country: "Spain" },

    // Italy
    { id: "FCO", name: "Leonardo da Vinci-Fiumicino Airport", city: "Rome", country: "Italy" },
    { id: "MXP", name: "Milan Malpensa Airport", city: "Milan", country: "Italy" },
    { id: "LIN", name: "Milan Linate Airport", city: "Milan", country: "Italy" },
    { id: "VCE", name: "Venice Marco Polo Airport", city: "Venice", country: "Italy" },
    { id: "NAP", name: "Naples International Airport", city: "Naples", country: "Italy" },
    { id: "BGY", name: "Milan Bergamo Airport", city: "Bergamo", country: "Italy" },
    { id: "BLQ", name: "Bologna Guglielmo Marconi Airport", city: "Bologna", country: "Italy" },

    // Netherlands
    { id: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
    { id: "EIN", name: "Eindhoven Airport", city: "Eindhoven", country: "Netherlands" },
    { id: "RTM", name: "Rotterdam The Hague Airport", city: "Rotterdam", country: "Netherlands" },

    // Switzerland
    { id: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
    { id: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland" },
    { id: "BSL", name: "EuroAirport Basel-Mulhouse-Freiburg", city: "Basel", country: "Switzerland" },

    // Belgium
    { id: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },

    // Austria
    { id: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria" },

    // Portugal
    { id: "LIS", name: "Lisbon Portela Airport", city: "Lisbon", country: "Portugal" },
    { id: "OPO", name: "Francisco Sá Carneiro Airport", city: "Porto", country: "Portugal" },
    { id: "FAO", name: "Faro Airport", city: "Faro", country: "Portugal" },

    // Greece
    { id: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece" },
    { id: "HER", name: "Heraklion International Airport", city: "Heraklion", country: "Greece" },
    { id: "SKG", name: "Thessaloniki Airport", city: "Thessaloniki", country: "Greece" },

    // Turkey
    { id: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
    { id: "SAW", name: "Sabiha Gökçen International Airport", city: "Istanbul", country: "Turkey" },
    { id: "AYT", name: "Antalya Airport", city: "Antalya", country: "Turkey" },
    { id: "ESB", name: "Esenboğa International Airport", city: "Ankara", country: "Turkey" },

    // Russia
    { id: "SVO", name: "Sheremetyevo International Airport", city: "Moscow", country: "Russia" },
    { id: "DME", name: "Domodedovo International Airport", city: "Moscow", country: "Russia" },
    { id: "LED", name: "Pulkovo Airport", city: "Saint Petersburg", country: "Russia" },

    // United Arab Emirates
    { id: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
    { id: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "United Arab Emirates" },
    { id: "SHJ", name: "Sharjah International Airport", city: "Sharjah", country: "United Arab Emirates" },

    // Qatar
    { id: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },

    // Saudi Arabia
    { id: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia" },
    { id: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia" },
    { id: "DMM", name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia" },

    // Egypt
    { id: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt" },
    { id: "HRG", name: "Hurghada International Airport", city: "Hurghada", country: "Egypt" },
    { id: "SSH", name: "Sharm El Sheikh International Airport", city: "Sharm El Sheikh", country: "Egypt" },

    // Morocco
    { id: "CMN", name: "Mohammed V International Airport", city: "Casablanca", country: "Morocco" },
    { id: "RAK", name: "Marrakesh Menara Airport", city: "Marrakesh", country: "Morocco" },

    // Tunisia
    { id: "TUN", name: "Tunis-Carthage International Airport", city: "Tunis", country: "Tunisia" },
    { id: "DJE", name: "Djerba-Zarzis International Airport", city: "Djerba", country: "Tunisia" },
    { id: "MIR", name: "Monastir Habib Bourguiba International Airport", city: "Monastir", country: "Tunisia" },

    // South Africa
    { id: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa" },
    { id: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa" },
    { id: "DUR", name: "King Shaka International Airport", city: "Durban", country: "South Africa" },

    // China
    { id: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" },
    { id: "PKX", name: "Beijing Daxing International Airport", city: "Beijing", country: "China" },
    { id: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China" },
    { id: "SHA", name: "Shanghai Hongqiao International Airport", city: "Shanghai", country: "China" },
    { id: "CAN", name: "Guangzhou Baiyun International Airport", city: "Guangzhou", country: "China" },
    { id: "CTU", name: "Chengdu Shuangliu International Airport", city: "Chengdu", country: "China" },
    { id: "SZX", name: "Shenzhen Bao'an International Airport", city: "Shenzhen", country: "China" },
    { id: "HGH", name: "Hangzhou Xiaoshan International Airport", city: "Hangzhou", country: "China" },
    { id: "XIY", name: "Xi'an Xianyang International Airport", city: "Xi'an", country: "China" },

    // Japan
    { id: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
    { id: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
    { id: "KIX", name: "Kansai International Airport", city: "Osaka", country: "Japan" },
    { id: "NGO", name: "Chubu Centrair International Airport", city: "Nagoya", country: "Japan" },
    { id: "FUK", name: "Fukuoka Airport", city: "Fukuoka", country: "Japan" },
    { id: "CTS", name: "New Chitose Airport", city: "Sapporo", country: "Japan" },

    // South Korea
    { id: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
    { id: "GMP", name: "Gimpo International Airport", city: "Seoul", country: "South Korea" },
    { id: "PUS", name: "Gimhae International Airport", city: "Busan", country: "South Korea" },

    // Thailand
    { id: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
    { id: "DMK", name: "Don Mueang International Airport", city: "Bangkok", country: "Thailand" },
    { id: "HKT", name: "Phuket International Airport", city: "Phuket", country: "Thailand" },
    { id: "CNX", name: "Chiang Mai International Airport", city: "Chiang Mai", country: "Thailand" },

    // Singapore
    { id: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },

    // Malaysia
    { id: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia" },
    { id: "PEN", name: "Penang International Airport", city: "Penang", country: "Malaysia" },

    // Indonesia
    { id: "CGK", name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia" },
    { id: "DPS", name: "Ngurah Rai International Airport", city: "Bali", country: "Indonesia" },

    // Philippines
    { id: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines" },
    { id: "CEB", name: "Mactan-Cebu International Airport", city: "Cebu", country: "Philippines" },

    // Vietnam
    { id: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam" },
    { id: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam" },

    // India
    { id: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India" },
    { id: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
    { id: "BLR", name: "Kempegowda International Airport", city: "Bangalore", country: "India" },
    { id: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India" },
    { id: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
    { id: "CCU", name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", country: "India" },

    // Australia
    { id: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
    { id: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia" },
    { id: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia" },
    { id: "PER", name: "Perth Airport", city: "Perth", country: "Australia" },
    { id: "ADL", name: "Adelaide Airport", city: "Adelaide", country: "Australia" },

    // New Zealand
    { id: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand" },
    { id: "CHC", name: "Christchurch International Airport", city: "Christchurch", country: "New Zealand" },
    { id: "WLG", name: "Wellington International Airport", city: "Wellington", country: "New Zealand" },

    // Brazil
    { id: "GRU", name: "São Paulo/Guarulhos International Airport", city: "São Paulo", country: "Brazil" },
    { id: "GIG", name: "Rio de Janeiro/Galeão International Airport", city: "Rio de Janeiro", country: "Brazil" },
    { id: "BSB", name: "Brasília International Airport", city: "Brasília", country: "Brazil" },
    { id: "CGH", name: "São Paulo/Congonhas Airport", city: "São Paulo", country: "Brazil" },

    // Mexico
    { id: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico" },
    { id: "CUN", name: "Cancún International Airport", city: "Cancún", country: "Mexico" },
    { id: "GDL", name: "Guadalajara International Airport", city: "Guadalajara", country: "Mexico" },
    { id: "MTY", name: "Monterrey International Airport", city: "Monterrey", country: "Mexico" },

    // Argentina
    { id: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina" },
    { id: "AEP", name: "Jorge Newbery Airpark", city: "Buenos Aires", country: "Argentina" },

    // Chile
    { id: "SCL", name: "Arturo Merino Benítez International Airport", city: "Santiago", country: "Chile" },

    // Colombia
    { id: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia" },
    { id: "MDE", name: "José María Córdova International Airport", city: "Medellín", country: "Colombia" },

    // Peru
    { id: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru" },

    // Israel
    { id: "TLV", name: "Ben Gurion Airport", city: "Tel Aviv", country: "Israel" },

    // Kenya
    { id: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya" },

    // Nigeria
    { id: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria" },
];

export const searchAirports = (query: string, limit: number = 10): Airport[] => {
    if (!query || query.length < 2) return AIRPORTS.slice(0, limit);

    const lowerQuery = query.toLowerCase();

    const results = AIRPORTS.filter(airport => {
        const nameMatch = airport.name.toLowerCase().includes(lowerQuery);
        const codeMatch = airport.id.toLowerCase().includes(lowerQuery);
        const cityMatch = airport.city.toLowerCase().includes(lowerQuery);
        const countryMatch = airport.country.toLowerCase().includes(lowerQuery);

        return nameMatch || codeMatch || cityMatch || countryMatch;
    });

    return results.slice(0, limit);
};

export const getAirportByCode = (code: string): Airport | undefined => {
    return AIRPORTS.find(airport => airport.id === code);
};

