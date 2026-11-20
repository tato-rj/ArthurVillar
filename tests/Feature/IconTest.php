<?php

namespace Tests\Feature;

use App\Models\Calendar\{Event, Location};
use App\Support\Icon;
use Illuminate\Support\Facades\Blade;
use Tests\BaseTest;

class IconTest extends BaseTest
{
    public function test_blade_icons_render_inline_with_optional_attributes()
    {
        $html = Blade::render(<<<'BLADE'
            @icon('piano')
            @icon('bell', ['mr' => 0, 'class' => 'notification-icon', 'aria-label' => 'Reminders', 'data-context' => 'A "quote"', 'onclick' => 'alert(1)'])
            BLADE);

        $this->assertStringContainsString('app-icon icon-piano mr-2', $html);
        $this->assertStringContainsString('data-lucide-name="piano"', $html);
        $this->assertStringContainsString('app-icon icon-bell mr-0 notification-icon', $html);
        $this->assertStringContainsString('role="img" aria-label="Reminders"', $html);
        $this->assertStringContainsString('data-context="A &quot;quote&quot;"', $html);
        $this->assertStringNotContainsString('onclick=', $html);
    }

    public function test_dynamic_calendar_and_legacy_icons_have_lucide_geometry()
    {
        $names = array_merge(array_keys(Event::typeOptions()), array_keys(Location::iconOptions()), [
            'google', 'futbol', 'earth-americas', 'earth-europe', 'earth-asia', 'fa-solid fa-mobile',
        ]);

        foreach ($names as $name) {
            $resolved = Icon::resolve($name);
            $this->assertStringContainsString('data-lucide-name="'.$resolved.'"', (string) Icon::render($name));
        }
    }
}
