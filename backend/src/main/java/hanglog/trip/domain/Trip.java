package hanglog.trip.domain;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import hanglog.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Trip extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    @ColumnDefault("''")
    private String description;

    public Trip(
            final Long id,
            final String title,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description
    ) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public Trip(
            final String title,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description
    ) {
        this(null, title, startDate, endDate, description);
    }

    public Trip(final String title, final LocalDate startDate, final LocalDate endDate
    ) {
        this(title, startDate, endDate, "");
    }
}
