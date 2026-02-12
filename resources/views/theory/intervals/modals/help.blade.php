@modal(['title' => fa('question-circle').' Help', 'id' => 'help-modal'])
<p>An interval has a <strong>number</strong> (how many letter names apart) and a <strong>quality</strong> (major, minor, etc.).</p>

<p>Here we have to find a <strong full-interval class="text-blue">major 7th</strong> above or below the note <strong initial-note>E</strong> on the staff.</p>

<div class="bg-light border p-2 mb-2">
<h6 class="bg-blue text-white px-2 py-1 small">Step 1</h6>
<p class="">If we count <strong short-interval class="text-blue">7</strong> <u>letters up</u> from <strong initial-note>E</strong>: we arrive at <strong new-note class="text-green">D</strong>.</p>

<p class="m-0">Feel free to count down instead! The new note will be different.</p>
</div>

<div class="bg-light border p-2">
<h6 class="bg-green text-white px-2 py-1 small">Step 2</h6>
<p class="m-0">Finally, to make it <strong full-interval class="text-blue">major 7th</strong>, we may need to adjust the <strong new-note class="text-green">D</strong> with as many sharps or flats as needed...</p>
</div>
@endmodal