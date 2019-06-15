<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreColumnsToCafeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cafes', function (Blueprint $table) {
            $table->text('website');
            $table->text('description')->nullable();
            $table->integer('added_by')->unsigned()->nullable();
            $table->integer('roaster');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cafes', function (Blueprint $table) {
            $table->dropColumn('website');
            $table->dropColumn('description');
            $table->dropColumn('added_by');
            $table->dropColumn('roaster');
        });
    }
}
