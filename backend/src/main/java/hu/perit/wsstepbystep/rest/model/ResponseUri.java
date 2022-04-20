/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package hu.perit.wsstepbystep.rest.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ResponseUri
{
    @ApiModelProperty(example = "https://localhost:8400/books/12")
    private String location;

    public ResponseUri location(String location)
    {
        this.location = location;
        return this;
    }
}
