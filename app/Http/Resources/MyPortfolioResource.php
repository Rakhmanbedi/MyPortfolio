<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MyPortfolioResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image' => $this->image,
            'title' => $this->title,
            'description' => $this->description,
            'url_name' => $this->url_name,
            'url' => $this->url,

            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
