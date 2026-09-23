<?php

namespace Tests\Unit;

use App\Games\KeysLabSettings;
use PHPUnit\Framework\TestCase;

class KeysLabSettingsTest extends TestCase
{
    public function test_accidental_limit_is_a_clamped_number_from_one_to_seven()
    {
        $this->assertSame(2, (new KeysLabSettings)->options('numberOfAccidentals'));
        $this->assertSame(1, (new KeysLabSettings(['numberOfAccidentals' => 0]))->options('numberOfAccidentals'));
        $this->assertSame(3, (new KeysLabSettings(['numberOfAccidentals' => '3']))->options('numberOfAccidentals'));
        $this->assertSame(7, (new KeysLabSettings(['numberOfAccidentals' => 9]))->options('numberOfAccidentals'));
        $this->assertSame(2, (new KeysLabSettings(['numberOfAccidentals' => 'many']))->options('numberOfAccidentals'));
    }

    public function test_modes_are_off_by_default_and_count_as_a_bonus_when_enabled()
    {
        $standard = (new KeysLabSettings)->options();
        $this->assertFalse($standard['modes']);
        $this->assertContains('modes', $standard['bonusPoints']);

        $modes = (new KeysLabSettings(['modes' => 'on']))->options();
        $this->assertSame('on', $modes['modes']);
    }
}
