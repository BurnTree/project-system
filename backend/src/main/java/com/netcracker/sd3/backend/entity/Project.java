package com.netcracker.sd3.backend.entity;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = "project", schema = "projectdatabase", catalog = "")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long idProject;

    @NotBlank
    @Size(min=4, max=50)
    private String summary;

    @NotBlank
    @Size(min=2, max=10)
    @Column(unique = true)
    private String nameProject;

    public long getIdProject() {
        return idProject;
    }
    public void setIdProject(long idProject) {
        this.idProject = idProject;
    }

    public String getSummary() {
        return summary;
    }
    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getNameProject() {
        return nameProject;
    }
    public void setNameProject(String nameProject) {
        this.nameProject = nameProject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project that = (Project) o;
        return idProject == that.idProject &&
                Objects.equals(summary, that.summary) &&
                Objects.equals(nameProject, that.nameProject);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProject, summary, nameProject);
    }
}
