package com.techpods.to_do_list.entity;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="tasks")
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    private String name;
    private String description;

    @Schema(defaultValue = "false")
    private boolean completed = false;

    @Enumerated(EnumType.ORDINAL)
    private Priority priority;

}
