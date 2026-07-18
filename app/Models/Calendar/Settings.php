<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Settings extends BaseModel
{
    public const TYPE_STRING = 'string';

    public const TYPE_BOOLEAN = 'boolean';

    public const TYPE_INTEGER = 'integer';

    protected $guarded = [];

    public static function getValue(string $key, $default = null)
    {
        $setting = static::query()->where('key', $key)->first();

        return $setting ? $setting->typedValue() : $default;
    }

    public static function setValue(string $key, $value, string $type = self::TYPE_STRING): self
    {
        $setting = static::query()->updateOrCreate(
            ['key' => $key],
            [
                'value' => static::serializeValue($value, $type),
                'type' => $type,
            ]
        );

        return $setting;
    }

    public function typedValue()
    {
        if ($this->value === null) {
            return null;
        }

        if ($this->type === self::TYPE_BOOLEAN) {
            return filter_var($this->value, FILTER_VALIDATE_BOOLEAN);
        }

        if ($this->type === self::TYPE_INTEGER) {
            return (int) $this->value;
        }

        return $this->value;
    }

    private static function serializeValue($value, string $type): ?string
    {
        if ($value === null) {
            return null;
        }

        if ($type === self::TYPE_BOOLEAN) {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
        }

        if ($type === self::TYPE_INTEGER) {
            return (string) ((int) $value);
        }

        return (string) $value;
    }
}
