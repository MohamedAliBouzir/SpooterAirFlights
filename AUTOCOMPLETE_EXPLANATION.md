# Flight Autocomplete - How It Works

## ✅ Current Implementation

The flight autocomplete is **already working correctly** according to Google Flights API specifications!

### How City Search Works:

1. **When you search** for a location (e.g., "New York"), the autocomplete shows:
   - **New York** (City) - with ID `/m/02_286`
   - **John F. Kennedy International Airport** (JFK)
   - **LaGuardia Airport** (LGA)
   - **Newark Liberty International Airport** (EWR)

2. **When you select a CITY** (e.g., "New York"):
   - The system stores the city ID: `/m/02_286`
   - The API automatically searches **ALL airports** in New York (JFK, LGA, EWR, etc.)
   - You get flights from any airport in that city

3. **When you select a specific AIRPORT** (e.g., "JFK"):
   - The system stores the airport code: `JFK`
   - The API searches **only that specific airport**
   - You get flights only from JFK

## 🔍 Visual Indicators

- **Globe icon** (🌍) = Country/Region → searches all airports in that region
- **Location pin** (📍) = City → searches all airports in that city
- **Plane icon** (✈️) = Specific Airport → searches only that airport
- **Indented items** = Airports are nested under their parent city

## 📋 SerpApi Documentation

According to [SerpApi Google Flights API](https://serpapi.com/google-flights-api):

> **departure_id** and **arrival_id** can be:
> - An airport code (3-letter IATA code like `JFK`, `CDG`)
> - A location kgmid (starts with `/m/` like `/m/05qtj` for Paris)
> 
> When using a city ID (`/m/...`), Google Flights automatically includes all airports in that city.

## 🎯 Example

Search: "Paris to New York"

**Option 1 - City to City:**
- From: Paris (`/m/05qtj`) → includes CDG, ORY, and all Paris airports
- To: New York (`/m/02_286`) → includes JFK, LGA, EWR, and all NYC airports

**Option 2 - Specific Airports:**
- From: Charles de Gaulle Airport (`CDG`)
- To: John F. Kennedy International Airport (`JFK`)

Both options work perfectly! The first gives you more flight options, the second is more specific.
