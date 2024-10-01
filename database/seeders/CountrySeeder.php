<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Country, Continent};

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->countries() as $country) {
            Country::create([
                'name' => $country['name'],
                'slug' => str_slug($country['name']),
                'continent_id' => $country['continent_id'],
                'nationality' => $country['nationality'] ?? null,
                'iso' => strtolower($country['iso'])
            ]);
        }   
    }

    public function countries()
    {
        return [
                ["iso" => "AF", "name" => "Afghanistan", "continent_id" => Continent::asia()->id],
                ["iso" => "AL", "name" => "Albania", "continent_id" => Continent::europe()->id],
                ["iso" => "DZ", "name" => "Algeria", "continent_id" => Continent::africa()->id],
                ["iso" => "AD", "name" => "Andorra", "continent_id" => Continent::europe()->id],
                ["iso" => "AO", "name" => "Angola", "continent_id" => Continent::africa()->id],
                ["iso" => "AI", "name" => "Anguilla", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "AR", "name" => "Argentina", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "AM", "name" => "Armenia", "continent_id" => Continent::asia()->id],
                ["iso" => "AW", "name" => "Aruba", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "AU", "name" => "Australia", "continent_id" => Continent::oceania()->id],
                ["iso" => "AT", "name" => "Austria", "continent_id" => Continent::europe()->id],
                ["iso" => "AZ", "name" => "Azerbaijan", "continent_id" => Continent::asia()->id],
                ["iso" => "BS", "name" => "Bahamas", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "BH", "name" => "Bahrain", "continent_id" => Continent::asia()->id],
                ["iso" => "BD", "name" => "Bangladesh", "continent_id" => Continent::asia()->id],
                ["iso" => "BB", "name" => "Barbados", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "BY", "name" => "Belarus", "continent_id" => Continent::europe()->id],
                ["iso" => "BE", "name" => "Belgium", "continent_id" => Continent::europe()->id],
                ["iso" => "BZ", "name" => "Belize", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "BJ", "name" => "Benin", "continent_id" => Continent::africa()->id],
                ["iso" => "BM", "name" => "Bermuda", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "BT", "name" => "Bhutan", "continent_id" => Continent::asia()->id],
                ["iso" => "BO", "name" => "Bolivia", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "BA", "name" => "Bosnia and Herzegovina", "continent_id" => Continent::asia()->id],
                ["iso" => "BW", "name" => "Botswana", "continent_id" => Continent::africa()->id],
                ["iso" => "BR", "name" => "Brazil", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "BG", "name" => "Bulgaria", "continent_id" => Continent::europe()->id],
                ["iso" => "KH", "name" => "Cambodia", "continent_id" => Continent::asia()->id],
                ["iso" => "CM", "name" => "Cameroon", "continent_id" => Continent::africa()->id],
                ["iso" => "CA", "name" => "Canada", "continent_id" => Continent::northAmerica()->id],
                ["iso" => "CV", "name" => "Cape Verde", "continent_id" => Continent::africa()->id],
                ["iso" => "CF", "name" => "Central African Republic", "continent_id" => Continent::africa()->id],
                ["iso" => "TD", "name" => "Chad", "continent_id" => Continent::africa()->id],
                ["iso" => "CL", "name" => "Chile", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "CN", "name" => "China", "continent_id" => Continent::asia()->id],
                ["iso" => "CO", "name" => "Colombia", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "CG", "name" => "Congo", "continent_id" => Continent::africa()->id],
                ["iso" => "CR", "name" => "Costa Rica", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "CI", "name" => "Côte D'Ivoire", "continent_id" => Continent::africa()->id],
                ["iso" => "HR", "name" => "Croatia", "continent_id" => Continent::europe()->id],
                ["iso" => "CU", "name" => "Cuba", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "CY", "name" => "Cyprus", "continent_id" => Continent::europe()->id],
                ["iso" => "CZ", "name" => "Czech Republic", "continent_id" => Continent::europe()->id],
                ["iso" => "DK", "name" => "Denmark", "continent_id" => Continent::europe()->id],
                ["iso" => "DO", "name" => "Dominican Republic", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "EC", "name" => "Ecuador", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "EG", "name" => "Egypt", "continent_id" => Continent::africa()->id],
                ["iso" => "SV", "name" => "El Salvador", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "EE", "name" => "Estonia", "continent_id" => Continent::europe()->id],
                ["iso" => "ET", "name" => "Ethiopia", "continent_id" => Continent::africa()->id],
                ["iso" => "FJ", "name" => "Fiji", "continent_id" => Continent::oceania()->id],
                ["iso" => "FI", "name" => "Finland", "continent_id" => Continent::europe()->id],
                ["iso" => "FR", "name" => "France", "continent_id" => Continent::europe()->id],
                ["iso" => "GM", "name" => "Gambia", "continent_id" => Continent::africa()->id],
                ["iso" => "GE", "name" => "Georgia", "continent_id" => Continent::europe()->id],
                ["iso" => "DE", "name" => "Germany", "continent_id" => Continent::europe()->id],
                ["iso" => "GH", "name" => "Ghana", "continent_id" => Continent::africa()->id],
                ["iso" => "GR", "name" => "Greece", "continent_id" => Continent::europe()->id],
                ["iso" => "GL", "name" => "Greenland", "continent_id" => Continent::northAmerica()->id],
                ["iso" => "GT", "name" => "Guatemala", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "GN", "name" => "Guinea", "continent_id" => Continent::africa()->id],
                ["iso" => "GW", "name" => "Guinea-Bissau", "continent_id" => Continent::africa()->id],
                ["iso" => "GY", "name" => "Guyana", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "HT", "name" => "Haiti", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "HN", "name" => "Honduras", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "HK", "name" => "Hong Kong", "continent_id" => Continent::asia()->id],
                ["iso" => "HU", "name" => "Hungary", "continent_id" => Continent::europe()->id],
                ["iso" => "IS", "name" => "Iceland", "continent_id" => Continent::europe()->id],
                ["iso" => "IN", "name" => "India", "continent_id" => Continent::asia()->id],
                ["iso" => "ID", "name" => "Indonesia", "continent_id" => Continent::oceania()->id],
                ["iso" => "IR", "name" => "Iran", "continent_id" => Continent::asia()->id],
                ["iso" => "IQ", "name" => "Iraq", "continent_id" => Continent::asia()->id],
                ["iso" => "IE", "name" => "Ireland", "continent_id" => Continent::europe()->id],
                ["iso" => "IL", "name" => "Israel", "continent_id" => Continent::asia()->id],
                ["iso" => "IT", "name" => "Italy", "continent_id" => Continent::europe()->id],
                ["iso" => "JM", "name" => "Jamaica", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "JP", "name" => "Japan", "continent_id" => Continent::asia()->id],
                ["iso" => "JO", "name" => "Jordan", "continent_id" => Continent::europe()->id],
                ["iso" => "KZ", "name" => "Kazakhstan", "continent_id" => Continent::asia()->id],
                ["iso" => "KE", "name" => "Kenya", "continent_id" => Continent::africa()->id],
                ["iso" => "KP", "name" => "North Korea", "continent_id" => Continent::asia()->id],
                ["iso" => "KR", "name" => "South Korea", "continent_id" => Continent::asia()->id],
                ["iso" => "KW", "name" => "Kuwait", "continent_id" => Continent::asia()->id],
                ["iso" => "LV", "name" => "Latvia", "continent_id" => Continent::europe()->id],
                ["iso" => "LB", "name" => "Lebanon", "continent_id" => Continent::asia()->id],
                ["iso" => "LS", "name" => "Lesotho", "continent_id" => Continent::africa()->id],
                ["iso" => "LR", "name" => "Liberia", "continent_id" => Continent::africa()->id],
                ["iso" => "LI", "name" => "Liechtenstein", "continent_id" => Continent::europe()->id],
                ["iso" => "LT", "name" => "Lithuania", "continent_id" => Continent::europe()->id],
                ["iso" => "LU", "name" => "Luxembourg", "continent_id" => Continent::europe()->id],
                ["iso" => "MO", "name" => "Macao", "continent_id" => Continent::asia()->id],
                ["iso" => "MG", "name" => "Madagascar", "continent_id" => Continent::africa()->id],
                ["iso" => "MY", "name" => "Malaysia", "continent_id" => Continent::asia()->id],
                ["iso" => "MV", "name" => "Maldives", "continent_id" => Continent::asia()->id],
                ["iso" => "ML", "name" => "Mali", "continent_id" => Continent::africa()->id],
                ["iso" => "MT", "name" => "Malta", "continent_id" => Continent::europe()->id],
                ["iso" => "MU", "name" => "Mauritius", "continent_id" => Continent::africa()->id],
                ["iso" => "MX", "name" => "Mexico", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "MD", "name" => "Moldova", "continent_id" => Continent::europe()->id],
                ["iso" => "MN", "name" => "Mongolia", "continent_id" => Continent::asia()->id],
                ["iso" => "MA", "name" => "Morocco", "continent_id" => Continent::africa()->id],
                ["iso" => "MZ", "name" => "Mozambique", "continent_id" => Continent::africa()->id],
                ["iso" => "MM", "name" => "Myanmar", "continent_id" => Continent::asia()->id],
                ["iso" => "NA", "name" => "Namibia", "continent_id" => Continent::africa()->id],
                ["iso" => "NP", "name" => "Nepal", "continent_id" => Continent::asia()->id],
                ["iso" => "NL", "name" => "Netherlands", "continent_id" => Continent::europe()->id],
                ["iso" => "NZ", "name" => "New Zealand", "continent_id" => Continent::oceania()->id],
                ["iso" => "NI", "name" => "Nicaragua", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "NE", "name" => "Niger", "continent_id" => Continent::africa()->id],
                ["iso" => "NG", "name" => "Nigeria", "continent_id" => Continent::africa()->id],
                ["iso" => "NO", "name" => "Norway", "continent_id" => Continent::europe()->id],
                ["iso" => "PK", "name" => "Pakistan", "continent_id" => Continent::asia()->id],
                ["iso" => "PW", "name" => "Palau", "continent_id" => Continent::oceania()->id],
                ["iso" => "PS", "name" => "Palestine", "continent_id" => Continent::asia()->id],
                ["iso" => "PA", "name" => "Panama", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "PG", "name" => "Papua New Guinea", "continent_id" => Continent::oceania()->id],
                ["iso" => "PY", "name" => "Paraguay", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "PE", "name" => "Peru", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "PH", "name" => "Philippines", "continent_id" => Continent::asia()->id],
                ["iso" => "PL", "name" => "Poland", "continent_id" => Continent::europe()->id],
                ["iso" => "PT", "name" => "Portugal", "continent_id" => Continent::europe()->id],
                ["iso" => "PR", "name" => "Puerto Rico", "continent_id" => Continent::centralAmerica()->id],
                ["iso" => "QA", "name" => "Qatar", "continent_id" => Continent::asia()->id],
                ["iso" => "RO", "name" => "Romania", "continent_id" => Continent::europe()->id],
                ["iso" => "RU", "name" => "Russia", "continent_id" => Continent::asia()->id],
                ["iso" => "RW", "name" => "Rwanda", "continent_id" => Continent::africa()->id],
                ["iso" => "WS", "name" => "Samoa", "continent_id" => Continent::oceania()->id],
                ["iso" => "SA", "name" => "Saudi Arabia", "continent_id" => Continent::asia()->id],
                ["iso" => "SN", "name" => "Senegal", "continent_id" => Continent::africa()->id],
                ["iso" => "RS", "name" => "Serbia", "continent_id" => Continent::europe()->id],
                ["iso" => "ME", "name" => "Montenegro", "continent_id" => Continent::europe()->id],
                ["iso" => "SL", "name" => "Sierra Leone", "continent_id" => Continent::africa()->id],
                ["iso" => "SG", "name" => "Singapore", "continent_id" => Continent::asia()->id],
                ["iso" => "SK", "name" => "Slovakia", "continent_id" => Continent::europe()->id],
                ["iso" => "SI", "name" => "Slovenia", "continent_id" => Continent::europe()->id],
                ["iso" => "SO", "name" => "Somalia", "continent_id" => Continent::africa()->id],
                ["iso" => "ZA", "name" => "South Africa", "continent_id" => Continent::africa()->id],
                ["iso" => "ES", "name" => "Spain", "continent_id" => Continent::europe()->id],
                ["iso" => "LK", "name" => "Sri Lanka", "continent_id" => Continent::asia()->id],
                ["iso" => "SD", "name" => "Sudan", "continent_id" => Continent::africa()->id],
                ["iso" => "SR", "name" => "Suriname", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "SE", "name" => "Sweden", "continent_id" => Continent::europe()->id],
                ["iso" => "CH", "name" => "Switzerland", "continent_id" => Continent::europe()->id],
                ["iso" => "TW", "name" => "Taiwan", "continent_id" => Continent::asia()->id],
                ["iso" => "TZ", "name" => "Tanzania", "continent_id" => Continent::africa()->id],
                ["iso" => "TH", "name" => "Thailand", "continent_id" => Continent::asia()->id],
                ["iso" => "TL", "name" => "Timor-Leste", "continent_id" => Continent::asia()->id],
                ["iso" => "TG", "name" => "Togo", "continent_id" => Continent::africa()->id],
                ["iso" => "TO", "name" => "Tonga", "continent_id" => Continent::africa()->id],
                ["iso" => "TT", "name" => "Trinidad and Tobago", "continent_id" => Continent::africa()->id],
                ["iso" => "TN", "name" => "Tunisia", "continent_id" => Continent::africa()->id],
                ["iso" => "TR", "name" => "Turkey", "continent_id" => Continent::asia()->id],
                ["iso" => "UG", "name" => "Uganda", "continent_id" => Continent::africa()->id],
                ["iso" => "UA", "name" => "Ukraine", "continent_id" => Continent::europe()->id],
                ["iso" => "AE", "name" => "United Arab Emirates", "continent_id" => Continent::asia()->id],
                ["iso" => "GB", "name" => "United Kingdom", "continent_id" => Continent::europe()->id],
                ["iso" => "US", "name" => "United States", "continent_id" => Continent::northAmerica()->id],
                ["iso" => "UY", "name" => "Uruguay", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "UZ", "name" => "Uzbekistan", "continent_id" => Continent::asia()->id],
                ["iso" => "VE", "name" => "Venezuela", "continent_id" => Continent::southAmerica()->id],
                ["iso" => "VN", "name" => "Vietnam", "continent_id" => Continent::asia()->id],
                ["iso" => "YE", "name" => "Yemen", "continent_id" => Continent::asia()->id],
                ["iso" => "ZM", "name" => "Zambia", "continent_id" => Continent::africa()->id],
                ["iso" => "ZW", "name" => "Zimbabwe", "continent_id" => Continent::africa()->id]
            ];
    }
}
