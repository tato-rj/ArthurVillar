export class PianoKeyboardUi {
  static NATURAL_ORDER = ["C", "D", "E", "F", "G", "A", "B"];
  static NATURAL_PITCH_CLASS = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  static PITCH_CLASS_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  constructor({
    rootSelector = "#keyboard",
    namespace = "pianoKeyboard",
    onKeyClick = null,
    visibleWhiteKeys = 7,
    initialStartNote = "C4",
  } = {}) {
    this.rootSelector = rootSelector;
    this.ns = namespace;
    this.onKeyClick = typeof onKeyClick === "function" ? onKeyClick : null;
    this.visibleWhiteKeys = Math.max(1, Number(visibleWhiteKeys) || 7);
    this._startWhiteMidi = this._naturalMidiFromNoteName(initialStartNote) ?? 60;
    this._activeNoteName = null;
    this._renderTimeoutId = null;
  }

  setStartNote(noteName) {
    const midi = this._naturalMidiFromNoteName(noteName);
    if (!Number.isFinite(midi)) return this;
    this._startWhiteMidi = midi;
    this.clearActive();
    this.render();
    return this;
  }

  bind() {
    this.render();

    $(document)
      .off(`click.${this.ns}`, this.rootSelector)
      .on(`click.${this.ns}`, this.rootSelector, (e) => {
        e.preventDefault();

        const $key = this._resolveKeyFromTarget(e.target);
        if (!$key.length) return;
        const noteName = this.noteNameForKey($key);
        if (this.onKeyClick) this.onKeyClick({ $key, noteName, manual: true });
      });

    return this;
  }

  unbind() {
    $(document).off(`click.${this.ns}`, this.rootSelector);
    return this;
  }

  render() {
    const $root = $(this.rootSelector).first();
    if (!$root.length) return this;

    const whiteNotes = this._visibleWhiteNotes();
    const nextIds = whiteNotes.map((white) => String(white.midi));
    const currentIds = $root.children(".key-wrapper").map((_, el) => String(el.getAttribute("data-white-midi") || "")).get();
    const changed = currentIds.join(",") !== nextIds.join(",");

    if (!changed) return this;

    const existing = new Map();
    $root.children(".key-wrapper").each((_, el) => {
      const $el = $(el);
      existing.set(String($el.attr("data-white-midi") || ""), $el);
    });

    $root.children(".key-wrapper").each((_, el) => {
      const id = String(el.getAttribute("data-white-midi") || "");
      if (!nextIds.includes(id)) $(el).remove();
    });

    const newWrappers = [];
    for (let i = 0; i < whiteNotes.length; i += 1) {
      const white = whiteNotes[i];
      const id = String(white.midi);
      let $wrapper = existing.get(id);
      if (!$wrapper || !$wrapper.length) {
        $wrapper = this._buildWrapper(white);
        newWrappers.push($wrapper);
      }
      $root.append($wrapper);
    }

    if (!currentIds.length) {
      $root.find(".white-key, .black-key").show();
      return this;
    }

    newWrappers.forEach(($wrapper) => {
      $wrapper.find(".white-key, .black-key").show();
    });

    return this;
  }

  noteNameForKey($key) {
    return $key?.length ? String($key.attr("data-note") || "") : "";
  }

  keyForNote(letter, accidentalClass, octave) {
    const targetMidi = this._midiForNoteSpec(letter, accidentalClass, octave);
    if (!Number.isFinite(targetMidi)) return $();

    this._ensureMidiVisible(targetMidi);
    const selector = `${this.rootSelector} [data-midi="${targetMidi}"]`;
    return $(selector).first();
  }

  clickKey($key) {
    if ($key?.length) $key.trigger("click");
    return this;
  }

  clearActive() {
    this._hideAllMarkers();
    this._activeNoteName = null;
    return this;
  }

  syncActiveKey($nextKey) {
    const nextNoteName = this.noteNameForKey($nextKey);
    if (this._activeNoteName && this._activeNoteName === nextNoteName) return this;

    this._hideAllMarkers();
    this._activeNoteName = null;

    if ($nextKey?.length) {
      this._showMarker($nextKey.find(".key-marker").first());
      this._activeNoteName = nextNoteName || null;
    }

    return this;
  }

  toggleKey($key) {
    if (!$key?.length) return this;

    const noteName = this.noteNameForKey($key);
    // eslint-disable-next-line no-console
    console.log("[PianoKeyboardUi] Keyboard key clicked", { note: noteName });
    if (this.onKeyClick) this.onKeyClick({ $key, noteName, manual: true });
    return this;
  }

  _markerHtml() {
    return `
      <div class="key-marker">
        <div class="d-center w-100">
          <span class="bg-primary"></span>
        </div>
      </div>
    `;
  }

  _buildWrapper(white) {
    const black = this._blackNoteAfter(white.midi);
    const $wrapper = $('<div class="position-relative key-wrapper"></div>').attr("data-white-midi", String(white.midi));

    if (black) {
      const $black = $('<div class="black-key"></div>').attr({
        "data-note": black.note,
        "data-midi": String(black.midi),
      });
      $black.append('<button type="button" class="btn btn-dark"></button>');
      $black.append(this._markerHtml());
      $wrapper.append($black);
    }

    const $white = $('<div class="white-key"></div>').attr({
      "data-note": white.note,
      "data-midi": String(white.midi),
    });
    $white.append('<button type="button" class="btn btn-white"></button>');
    $white.append(this._markerHtml());
    $wrapper.append($white);

    return $wrapper;
  }

  _resolveKeyFromTarget(target) {
    let $key = $(target).closest(".white-key, .black-key");
    if ($key.length) return $key;

    const $wrapper = $(target).closest(`${this.rootSelector} .key-wrapper`);
    if ($wrapper.length) $key = $wrapper.find(".black-key, .white-key").first();
    return $key;
  }

  _visibleWhiteNotes() {
    const out = [];
    let midi = this._startWhiteMidi;
    for (let i = 0; i < this.visibleWhiteKeys; i += 1) {
      out.push({ midi, note: this._naturalNoteNameFromMidi(midi) });
      midi = this._nextNaturalMidi(midi);
    }
    return out;
  }

  _blackNoteAfter(whiteMidi) {
    const pitchClass = ((whiteMidi % 12) + 12) % 12;
    if (pitchClass === 4 || pitchClass === 11) return null; // E/B have no black key above

    const midi = whiteMidi + 1;
    return { midi, note: this._noteNameFromMidi(midi) };
  }

  _ensureMidiVisible(targetMidi) {
    if (!Number.isFinite(targetMidi)) return;

    while (targetMidi < this._startWhiteMidi) {
      this._startWhiteMidi = this._prevNaturalMidi(this._startWhiteMidi);
      this.render();
    }

    while (true) {
      const lastWhiteMidi = this._lastWhiteMidi();
      const lastBlack = this._blackNoteAfter(lastWhiteMidi);
      const maxVisibleMidi = lastBlack ? lastBlack.midi : lastWhiteMidi;
      if (targetMidi <= maxVisibleMidi) break;
      this._startWhiteMidi = this._nextNaturalMidi(this._startWhiteMidi);
      this.render();
    }
  }

  _lastWhiteMidi() {
    let midi = this._startWhiteMidi;
    for (let i = 1; i < this.visibleWhiteKeys; i += 1) {
      midi = this._nextNaturalMidi(midi);
    }
    return midi;
  }

  _nextNaturalMidi(midi) {
    const current = this._naturalNoteNameFromMidi(midi);
    const letter = current.replace(/\d+$/, "");
    const octave = Number(current.match(/-?\d+$/)?.[0] || 4);
    const idx = PianoKeyboardUi.NATURAL_ORDER.indexOf(letter);
    const nextIdx = (idx + 1) % PianoKeyboardUi.NATURAL_ORDER.length;
    const nextOctave = nextIdx === 0 ? octave + 1 : octave;
    return this._naturalMidiFromLetterOctave(PianoKeyboardUi.NATURAL_ORDER[nextIdx], nextOctave);
  }

  _prevNaturalMidi(midi) {
    const current = this._naturalNoteNameFromMidi(midi);
    const letter = current.replace(/\d+$/, "");
    const octave = Number(current.match(/-?\d+$/)?.[0] || 4);
    const idx = PianoKeyboardUi.NATURAL_ORDER.indexOf(letter);
    const prevIdx = (idx - 1 + PianoKeyboardUi.NATURAL_ORDER.length) % PianoKeyboardUi.NATURAL_ORDER.length;
    const prevOctave = idx === 0 ? octave - 1 : octave;
    return this._naturalMidiFromLetterOctave(PianoKeyboardUi.NATURAL_ORDER[prevIdx], prevOctave);
  }

  _midiForNoteSpec(letter, accidentalClass, octave) {
    const cleanLetter = String(letter || "").trim().toUpperCase();
    const numOctave = Number(octave);
    const basePc = PianoKeyboardUi.NATURAL_PITCH_CLASS[cleanLetter];
    if (!Number.isInteger(basePc) || !Number.isFinite(numOctave)) return null;
    const midi = ((numOctave + 1) * 12) + basePc + this._accidentalOffset(accidentalClass);
    return midi;
  }

  _accidentalOffset(accidentalClass) {
    if (!accidentalClass) return 0;
    if (accidentalClass.includes("music-font__doublesharp")) return 2;
    if (accidentalClass.includes("music-font__sharp")) return 1;
    if (accidentalClass.includes("music-font__doubleflat")) return -2;
    if (accidentalClass.includes("music-font__flat")) return -1;
    return 0;
  }

  _naturalMidiFromNoteName(noteName) {
    const m = String(noteName || "").trim().match(/^([A-G])(-?\d+)$/);
    if (!m) return null;
    return this._naturalMidiFromLetterOctave(m[1], Number(m[2]));
  }

  _naturalMidiFromLetterOctave(letter, octave) {
    const pc = PianoKeyboardUi.NATURAL_PITCH_CLASS[String(letter || "").toUpperCase()];
    if (!Number.isInteger(pc) || !Number.isFinite(octave)) return null;
    return ((octave + 1) * 12) + pc;
  }

  _noteNameFromMidi(midi) {
    if (!Number.isFinite(midi)) return "";
    const pitchClass = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    return `${PianoKeyboardUi.PITCH_CLASS_TO_NOTE[pitchClass]}${octave}`;
  }

  _naturalNoteNameFromMidi(midi) {
    if (!Number.isFinite(midi)) return "";
    const pitchClass = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    const letter = Object.keys(PianoKeyboardUi.NATURAL_PITCH_CLASS)
      .find((key) => PianoKeyboardUi.NATURAL_PITCH_CLASS[key] === pitchClass);
    return letter ? `${letter}${octave}` : "";
  }

  _keyByNoteName(noteName) {
    if (!noteName) return $();
    return $(`${this.rootSelector} [data-note="${noteName}"]`).first();
  }

  _hideAllMarkers() {
    $(`${this.rootSelector} .key-marker`).hide();
  }

  _showMarker($marker) {
    if (!$marker?.length) return;
    $marker
      .removeClass("animate__animated animate__jello")
      .show();
    // eslint-disable-next-line no-unused-expressions
    $marker[0] && $marker[0].offsetWidth;
    $marker.addClass("animate__animated animate__jello");
  }
}
