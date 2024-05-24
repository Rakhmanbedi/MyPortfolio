<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AboutMeResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image' => $this->image,
            'about' => $this->about,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
